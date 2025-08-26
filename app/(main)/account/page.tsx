import { getAccount } from "@/actions/account";
import { PageTitle, PageTitleDescription } from "@/components/reusables/titles";
import {
    PageHeaderWrapper,
    PageWrapper,
} from "@/components/reusables/wrappers";
import AccountDetails from "./account-details";

const AccountPage = async () => {
    const { account } = await getAccount();

    return (
        <PageWrapper>
            <PageHeaderWrapper>
                <PageTitle> Account </PageTitle>
                <PageTitleDescription>
                    Manage your account settings and preferences.
                </PageTitleDescription>
            </PageHeaderWrapper>
            <AccountDetails account={account} /> 
        </PageWrapper>
    );
};

export default AccountPage;
