import React, { useState } from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import { useAuth } from '../../contexts/AuthContext';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export function ProjectComments({ projectId }: { projectId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useProjectData<Comment[]>('comments', []);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Comments</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <span className="font-medium">{comment.userName}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}