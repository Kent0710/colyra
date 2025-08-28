import {
    SectionDescription,
    SectionSubTitle,
    SectionTitle,
} from "@/components/reusables/titles";
import {
    ModalWrapper,
    SectionHeaderWrapper,
} from "@/components/reusables/wrappers";
import { getSpaceMembersBySpaceId } from "@/actions/member";
import ApproveMemberButton from "./approve-member-button";
import DisproveMemberButton from "./disprove-member.button";

interface MembersProps {
    className?: string;
    spaceId: string;
}

const Members: React.FC<MembersProps> = async ({ spaceId, className }) => {
    const { approvedMembers, isNotApprovedMembers } =
        await getSpaceMembersBySpaceId(spaceId);

    return (
        <ModalWrapper className={`${className}`}>
            <SectionHeaderWrapper>
                <SectionTitle> Members </SectionTitle>
                <SectionDescription>
                    Manage members of this space and their roles.{" "}
                </SectionDescription>
            </SectionHeaderWrapper>
            <main className="space-y-4">
                <ModalWrapper>
                    <ul>
                        <SectionSubTitle> Approved Members </SectionSubTitle>
                        {approvedMembers.length > 0 ? (
                            approvedMembers.map((member) => (
                                <li
                                    key={member.account_id.id}
                                    id={member.account_id.id!}
                                    className="my-2 flex items-center justify-between"
                                >
                                    <span>{member.account_id.username}</span>
                                    <DisproveMemberButton
                                        spaceId={spaceId}
                                        accountId={member.account_id.id}
                                    />
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No approved members.
                            </p>
                        )}
                    </ul>
                </ModalWrapper>
                <ModalWrapper>
                    <ul>
                        <SectionSubTitle> Pending Members </SectionSubTitle>
                        {isNotApprovedMembers.length > 0 ? (
                            isNotApprovedMembers.map((member) => (
                                <li
                                    key={member.account_id.id}
                                    id={member.account_id.id!}
                                    className="flex items-center justify-between my-2"
                                >
                                    <span>{member.account_id.username}</span>
                                    <ApproveMemberButton
                                        spaceId={spaceId}
                                        accountId={member.account_id.id}
                                    />
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No pending members.
                            </p>
                        )}
                    </ul>
                </ModalWrapper>
            </main>
        </ModalWrapper>
    );
};

export default Members;
