// pages/forums/[pincode].tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommunityForum from '../../components/CommunityForum';
import connectDB from '../../../db';
import { Forum } from '../../../models/Forum';

const ForumPage: React.FC = () => {
  const router = useRouter();
  const { pincode } = router.query as { pincode: string };

  const [forumExists, setForumExists] = useState<boolean>(false);

  useEffect(() => {
    const checkForumExistence = async () => {
      await connectDB();

      const forum = await Forum.findOne({ pincode });
      setForumExists(!!forum);

      if (!forum) {
        // Create a new forum if it doesn't exist
        await Forum.create({ pincode, textChannels: [] });
      }
    };

    checkForumExistence();
  }, [pincode]);

  if (!forumExists) {
    // Optionally, you can handle non-existing forums here.
    return <div>Forum not found</div>;
  }

  return <CommunityForum />;
};

export default ForumPage;
