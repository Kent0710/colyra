import { SectionDescription, SectionTitle } from "@/components/reusables/titles";
import {
    ModalWrapper,
    SectionHeaderWrapper,
} from "@/components/reusables/wrappers";
import ChatInterface from "./chat-interface";
import { getMessagesBySpaceId } from "@/actions/message";

interface RealtimeChatProps {
    className?: string;
    spaceId : string;
}

const RealtimeChat: React.FC<RealtimeChatProps> = async ({ className, spaceId }) => {
    const { messages } = await getMessagesBySpaceId(spaceId);

    return (
        <ModalWrapper className={`${className} flex flex-col`}>
            <SectionHeaderWrapper>
                <SectionTitle> Space Chat </SectionTitle>
                <SectionDescription> Collaborate with space members in realtime. </SectionDescription>
            </SectionHeaderWrapper>
            <ChatInterface spaceId={spaceId} messages={messages} />
        </ModalWrapper>
    );
};

export default RealtimeChat;
