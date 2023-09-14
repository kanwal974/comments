import { useState } from "react";

interface CommentFormProps {
  handleSubmit: (script: string, parentId?: string | null) => void;
  id?: string | null;
}

export const CommentForm = ({ handleSubmit, id = null }: CommentFormProps) => {
  const [script, setScript] = useState<string>("");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(script, id);
    setScript("");
  };

  return (
    <form onSubmit={onSubmit} className="white-bg p-2">
      <div className="form p-2 d-flex">
        <input
          placeholder="Write your comment"
          onChange={(e) => setScript(e.target.value)}
          value={script}
          className="w-100"
        />
        <button type="submit">
          <img src="/assets/send.svg" />
        </button>
      </div>
    </form>
  );
};
