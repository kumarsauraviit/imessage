export function ChatComposer() {
  const composerText = useChatStore((state) => state.composerText);
  const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);
  const sendMediaMessage = useChatStore((state) => state.sendMediaMessage);
  const isSendingMedia = useChatStore((state) => state.isSendingMedia);
  const isMessageSending = useChatStore((state) => state.isMessageSending); // ✅ add this
  const sendTextMessage = useChatStore((state) => state.sendTextMessage);
  const setComposerText = useChatStore((state) => state.setComposerText);
  const { activeConversationId } = useSelectedConversation();
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const mediaInputRef = useRef(null);

  const playSoundIfEnabled = () => {
    if (isSoundEnabled) playRandomKeyStrokeSound();
  };

  const handleSend = async () => {
    if (isMessageSending) return;              // ✅ extra guard against double Enter/click
    const didSendMessage = await sendTextMessage(activeConversationId);
    if (didSendMessage) playSoundIfEnabled();
  };



  return (
    <footer className="shrink-0 border-t border-border px-1.5 pb-2 pt-2 sm:px-2">
      ...
      <div className="mx-auto flex w-full max-w-full items-end gap-1.5 px-0.5 sm:gap-2 sm:px-1">
        <input
          ref={mediaInputRef}
          type="file"
          accept="image/*,video/*"
          className="sr-only"
          disabled={isSendingMedia}
          tabIndex={-1}
          aria-hidden
          onChange={handleMediaPick}
        />
        <Button
          variant="ghost"
          isIconOnly
          isDisabled={isSendingMedia || isMessageSending}   // ✅ also block media button while sending
          className="size-9 shrink-0 touch-manipulation self-end text-accent"
          onPress={() => mediaInputRef.current?.click()}
        >
          <ImageIcon className="size-5 sm:size-6" strokeWidth={2} />
        </Button>
        <TextArea
          fullWidth
          variant="secondary"
          placeholder="iMessage"
          rows={1}
          value={composerText}
          onChange={handleComposerTextChange}
          isDisabled={isMessageSending}                      // ✅ optional: lock input while sending
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 rounded-full"
        />

        <Button
          variant="primary"
          isIconOnly
          isDisabled={!composerText.trim() || isMessageSending}  // ✅ the actual fix
          onPress={handleSend}
        >
          {isMessageSending ? (
            <LoaderIcon className="size-5 animate-spin" strokeWidth={2} />
          ) : (
            <SendHorizontalIcon className="size-5" />
          )}
        </Button>
      </div>
    </footer>
  );
}