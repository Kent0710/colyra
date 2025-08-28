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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendMesageFormSchema } from "@/types/form-schemas";
import { useEffect, useState } from "react";

import { Loader2, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { FormattedMessages } from "@/actions/message";
import React from "react";

// Extend Window interface for TypeScript
declare global {
    interface Window {
        realtimeChannel?: unknown;
    }
}

interface ChatInterfaceProps {
    spaceId: string;
    messages: FormattedMessages[];
    className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    spaceId,
    messages: initialMessages,
    className,
}) => {
    const [messages, setMessages] =
        useState<FormattedMessages[]>(initialMessages);

    const form = useForm({
        resolver: zodResolver(sendMesageFormSchema),
        defaultValues: {
            message: "",
        },
    });

    const supabase = createClient();

    useEffect(() => {
        console.log("Setting up realtime subscription for space:", spaceId);

        const myChannel = supabase.channel(`${spaceId}-messages`);

        myChannel
            .on("broadcast", { event: "new-message" }, (payload) => {
                console.log("New message received!", payload);

                // Inside the payload, there is a payload object that contains the message details
                const newMessage = payload.payload;

                // Check if the user owned the payload
                // const isOwned = newMessage.accountId === newMessage.account_id;

                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: newMessage.id,
                        content: newMessage.message,
                        username: newMessage.username,
                        isOwned: newMessage.isOwned,
                    } as FormattedMessages,
                ]);
            })
            .subscribe((status) => {
                console.log("Channel subscription status:", status);
            });

        // Store channel in window for broadcasting (temporary solution)
        window.realtimeChannel = myChannel;

        // Cleanup function
        return () => {
            console.log("Cleaning up channel subscription");
            myChannel.unsubscribe();
            window.realtimeChannel = null;
        };
    }, [spaceId, supabase]);

    const handleSendMessage = async (
        values: z.infer<typeof sendMesageFormSchema>
    ) => {
        console.log("Sending message:", values.message);
        toast.loading("Sending message...");

        const { sendMessage } = await import("@/actions/message");
        const res = await sendMessage(values, spaceId);

        toast.dismiss();

        if (res.success) {
            console.log("Message sent successfully, broadcasting...");
            form.reset();

            // Use the existing channel from window to broadcast
            const channel = window.realtimeChannel;
            if (channel && typeof channel === "object" && "send" in channel) {
                console.log("Broadcasting through existing channel...");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (channel as any)
                    .send({
                        type: "broadcast",
                        event: "new-message",
                        payload: {
                            id: res.message!.id,
                            message: values.message,
                            spaceId: spaceId,
                            username: res.message!.username,
                            isOwned: res.message!.isOwned,
                        },
                    })
                    .then(() => {
                        console.log("Message broadcasted successfully");
                        toast.success("Message sent!");
                    })
                    .catch((error: unknown) => {
                        console.error("Failed to broadcast message:", error);
                        toast.error("Message sent but failed to broadcast");
                    });

                setMessages((prevMessages) => [
                    ...prevMessages,
                    res.message as FormattedMessages,
                ]);
            } else {
                console.error("No channel reference available");
                toast.error(
                    "Message sent but no channel available for broadcasting"
                );
            }
        } else {
            console.error("Failed to send message:", res.error);
            toast.error("Failed to send message");
        }
    };

    return (
        <div className="flex-1">
            {/* Messages Area  */}
            <section className=" space-y-4 mb-[2rem] h-[45vh] lg:h-[52vh] overflow-y-auto ">
                {messages.map((message) =>
                    message.isOwned ? (
                        <React.Fragment key={message.id}>
                            <OwnedMessages
                                username={message.username}
                                content={message.content}
                            />
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={message.id}>
                            <NotOwnedMessages
                                username={message.username}
                                content={message.content}
                            />
                        </React.Fragment>
                    )
                )}
            </section>

            {/* Send Message Area  */}
            <section className="bottom-0 bg-purple-100 sticky flex gap-2 mt-4 py-1.5 px-3 rounded-lg shadow-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSendMessage)}
                        className="flex w-full gap-2"
                    >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="flex-1 mb-0">
                                    <FormControl>
                                        <Input
                                            placeholder="Type your message here..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={!form.formState.isValid}
                        >
                            {/* Load if sending  */}
                            {form.formState.isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Send />
                            )}
                        </Button>
                    </form>
                </Form>
            </section>
        </div>
    );
};

export default ChatInterface;

interface MessageUIProps {
    username: string;
    content: string;
}

const OwnedMessages: React.FC<MessageUIProps> = ({ username, content }) => {
    return (
        <div className="flex flex-row-reverse gap-2 border rounded-lg p-3 w-fit ml-20 place-self-end">
            <div className="w-7 h-7 shrink-0  rounded-full bg-blue-500" />
            <div>
                <div className="flex justify-between gap-10 items-center flex-row-reverse">
                    <small className="font-medium"> {username} </small>
                    <small className="text-xs text-muted-foreground">
                        {" "}
                        Aug 25, 2025, 11:59 PM{" "}
                    </small>
                </div>
                <p className="text-sm">{content}</p>
            </div>
        </div>
    );
};

const NotOwnedMessages: React.FC<MessageUIProps> = ({ username, content }) => {
    return (
        <div className="flex gap-2 border rounded-lg p-3 mr-20 w-fit place-self-start">
            <div className="w-7 h-7 shrink-0  rounded-full bg-blue-500" />
            <div>
                <div className="flex justify-between gap-10 items-center">
                    <small className="font-medium"> {username} </small>
                    <small className="text-xs text-muted-foreground">
                        {" "}
                        Aug 25, 2025, 11:59 PM{" "}
                    </small>
                </div>
                <p className="text-sm">{content}</p>
            </div>
        </div>
    );
};
