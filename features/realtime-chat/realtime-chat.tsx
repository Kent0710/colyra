import {
    SectionDescription,
    SectionTitle,
} from "@/components/reusables/titles";
import {
    ModalWrapper,
    SectionHeaderWrapper,
} from "@/components/reusables/wrappers";
import ChatInterface from "./chat-interface";
import { getMessagesBySpaceId } from "@/actions/message";

interface RealtimeChatProps {
    className?: string;
    chatInterfaceClassName?: string;
    spaceId: string;
}

const RealtimeChat: React.FC<RealtimeChatProps> = async ({
    className,
    spaceId,
    chatInterfaceClassName,
}) => {
    const { messages } = await getMessagesBySpaceId(spaceId);

    return (
        <ModalWrapper className={`${className} border-none`}>
            <SectionHeaderWrapper>
                <SectionTitle> Space Chat </SectionTitle>
                <SectionDescription>
                    {" "}
                    Collaborate with space members in realtime.{" "}
                </SectionDescription>
            </SectionHeaderWrapper>
            <ChatInterface className={chatInterfaceClassName} spaceId={spaceId} messages={messages} />
        </ModalWrapper>
    );
};

export default RealtimeChat;
