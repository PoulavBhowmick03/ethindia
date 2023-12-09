// components/Post.tsx
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface PostProps {
  post: {
    id: number;
    title: string;
    content: string;
    votes: number;
  };
  onVote: (postId: number, voteType: string) => void;
}

const Post: React.FC<PostProps> = ({ post, onVote }) => {
  const { id, title, content, votes } = post;

  return (
    <article className="bg-gradient-to-r from-purple-800 to-purple-700 p-5 rounded my-4 relative border border-purple-900 bg-opacity-20 backdrop-blur-lg">
      <div className="glassmorphism p-4">
        <div className="flex items-center mb-2">
          <button className="text-xl mr-2" onClick={() => onVote(id, 'upvote')}>
            <FaArrowUp />
          </button>
          <button className="text-xl" onClick={() => onVote(id, 'downvote')}>
            <FaArrowDown />
          </button>
        </div>
        <h2 className="text-xl mb-2">{title}</h2>
        <p>{content}</p>
        <div className="flex justify-between text-sm text-purple-400 mt-4">
          <p>{votes} votes</p>
        </div>
      </div>
    </article>
  );
};

export default Post;
