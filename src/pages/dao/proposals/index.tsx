import { useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Sidebar from '../components/sidebar';

interface Post {
  id: number;
  title: string;
  content: string;
  votes: number;
}

interface PostProps {
  post: Post;
  onVote: (id: number, vote: number) => void;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState<Post>({ id: 0, title: '', content: '', votes: 0 });

  const handleVote = (postId: number, vote: number) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          votes: post.votes + vote,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const handleAddPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  const handleNewPost = () => {
    if (newPost.title && newPost.content) {
      handleAddPost({
        ...newPost,
        id: posts.length + 1,
      });

      setNewPost({ id: 0, title: '', content: '', votes: 0 });
      setShowModal(false);
    }
  };

  return (
    <div className="flex h-full bg-slate-800">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-slate-900a text-white">
        {/* Header */}
        <header className="bg-inherit p-4 flex justify-between items-center">
          <span className="font-bold text-xl">Proposals</span>
          <button
            className="px-2 py-1 bg-purple-500 hover:bg-purple-600 rounded"
            onClick={() => setShowModal(true)}
          >
            + New Post
          </button>
        </header>

        {/* Posts */}
        <main className="px-2 py-8 flex-1 overflow-y-auto">
          {posts.map(post => (
            <Post key={post.id} post={post} onVote={handleVote} />
          ))}
        </main>

        {/* New Post Modal */}
        {showModal && (
          <div className="modal-overlay flex items-center justify-center">
            <div className="modal glassmorphism p-6 rounded">
              <h2 className="text-2xl font-bold mb-4">New Post</h2>
              <label htmlFor="postTitle" className="block mb-2">
                Title:
                <input
                  type="text"
                  id="postTitle"
                  className="border p-1 text-black"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </label>
              <label htmlFor="postContent" className="block mb-4">
                Content:
                <textarea
                  id="postContent"
                  className="border p-1 text-black"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </label>
              <button className="bg-purple-500 text-white p-2 rounded" onClick={handleNewPost}>
                Post
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Post component
function Post({ post, onVote }: PostProps) {
  const { id, title, content, votes } = post;

  return (
    <article className="bg-gradient-to-r from-purple-800 to-purple-700 p-5 rounded my-4 relative border border-purple-900 bg-opacity-20 backdrop-blur-lg">
      <div className="glassmorphism p-4">
        <div className="flex items-center mb-2">
          <button className="text-xl mr-2" onClick={() => onVote(id, 1)}>
            <FaArrowUp />
          </button>
          <button className="text-xl" onClick={() => onVote(id, -1)}>
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
}