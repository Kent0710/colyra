"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isEditingAccountDetailsFormSchema } from "@/types/form-schemas";

import { AccountTableSchema } from "@/types/db-schemas";
import React, { useState } from "react";
import { Edit, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AccountDetailsProps {
    account: AccountTableSchema;
}

const accountDetailsViewClassname = "px-[20rem] space-y-4";

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing)
        return (
            <IsEditingView
                account={account}
                setIsEditing={setIsEditing}
            />
        );
    return (
        <IsNotEditingView
            account={account}
            setIsEditing={setIsEditing}
        />
    );
};

export default AccountDetails;

interface EditingViewProps {
    account : AccountTableSchema;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const IsEditingView: React.FC<EditingViewProps> = ({
    account,
    setIsEditing,
}) => {
    const isEditingViewForm = useForm({
        resolver: zodResolver(isEditingAccountDetailsFormSchema),
        defaultValues: {
            username: account.username,
        },
    });

    const onSubmit = async (
        values: z.infer<typeof isEditingAccountDetailsFormSchema>
    ) => {
        // TODO: Handle more field update
        // Current approach only handles username update

        if (account.username === values.username) {
            toast.error("No changes made.");
            return;
        };

        const { updateAccountDetails } = await import ("@/actions/account");
        const res = await updateAccountDetails(values);
        if (res.success) {
            toast.success("Account details updated successfully.");
            setIsEditing(false);
        } else {
            toast.error(`Error updating account details: ${res.error}`);
        }
    };

    return (
        <div className={accountDetailsViewClassname}>
            <Button onClick={() => setIsEditing(false)} variant={"secondary"}>
                {" "}
                <X /> Cancel editing{" "}
            </Button>
            <Form {...isEditingViewForm}>
                <form
                    onSubmit={isEditingViewForm.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={isEditingViewForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Username </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={account.username}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"> Save changes </Button>
                </form>
            </Form>
        </div>
    );
};

const IsNotEditingView: React.FC<EditingViewProps> = ({
    setIsEditing,
    account 
}) => {
    return (
        <div className={accountDetailsViewClassname}>
            <Button onClick={() => setIsEditing(true)}>
                <Edit /> Edit details
            </Button>
            <Label htmlFor="username"> Username </Label>
            <Input
                name="username"
                placeholder={account.username}
                disabled
            />
        </div>
    );
};
