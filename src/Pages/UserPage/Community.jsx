import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Send, Users } from 'lucide-react';
import Header from '../../Components/UserSide/Header';

export default function CommunityPage() {
  const [newMessage, setNewMessage] = useState('');

  const posts = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'SC',
      text: 'Just got an A in Calculus! The grade predictor really helped me stay on track. Thanks everyone for the study tips!',
      likes: 12,
      replies: 3,
      time: '2h ago'
    },
    {
      id: 2,
      author: 'Mike Johnson',
      avatar: 'MJ',
      text: 'Quick tip: Update your grades after every assignment. It makes the predictions way more accurate!',
      likes: 8,
      replies: 5,
      time: '5h ago'
    },
    {
      id: 3,
      author: 'Emma Davis',
      avatar: 'ED',
      text: 'Anyone else using this for multiple courses? How do you organize everything?',
      likes: 6,
      replies: 7,
      time: '1d ago'
    },
    {
      id: 4,
      author: 'Alex Kumar',
      avatar: 'AK',
      text: 'The predictor showed I needed an 85 on my final to get an A. Studied hard and got a 92! 🎉',
      likes: 15,
      replies: 4,
      time: '2d ago'
    }
  ];

  const handlePost = () => {
    if (newMessage.trim()) {
      // Handle posting logic here
      setNewMessage('');
    }
  };

  return (
    <div>
      <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Community</h1>
                <p className="text-sm text-gray-600">428 active members</p>
              </div>
            </div>
          </div>

          {/* Post Input */}
          <div className="flex gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              You
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Share your thoughts..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePost()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handlePost}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                  {post.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {post.author}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">{post.time}</span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    {post.text}
                  </p>
                  
                  <div className="flex items-center gap-4 sm:gap-6">
                    <button className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies} replies</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors text-sm">
            View more posts
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}