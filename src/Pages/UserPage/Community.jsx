import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ThumbsUp, 
  Send, 
  Users, 
  Search, 
  Award, 
  BookOpen, 
  FileText, 
  Clock, 
  Sparkles,
  TrendingUp,
  Share2
} from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import { useSocket } from '../../contexts/SocketContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CommunityPage() {
  const { socket } = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('feed'); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/api/user/faculty', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Map backend data to UI format
      const formatted = response.data.map(f => ({
        name: f.name,
        subject: f.subject || f.department || 'Academic Dean',
        status: Math.random() > 0.3 ? 'Online' : 'In Meeting', // Simulated status
        color: Math.random() > 0.3 ? 'text-emerald-500' : 'text-amber-500'
      }));
      setFacultyList(formatted.length > 0 ? formatted : [
        { name: 'Dr. Ramesh Kumar', subject: 'Data Structures', status: 'Online', color: 'text-emerald-500' },
        { name: 'Prof. Sneha Nair', subject: 'Machine Learning', status: 'In Meeting', color: 'text-amber-500' }
      ]);
    } catch (error) {
      console.error('Faculty sync error:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/api/user/community/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      toast.error('Network sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (socket) {
      // Listen for socket events from the backend helper
      socket.on('new-community-post', (post) => {
        // Prevent duplicate if it's our own post we already added locally
        setPosts(prev => {
          if (prev.find(p => p.id === post.id)) return prev;
          return [post, ...prev];
        });
        toast.info(`New strategy from ${post.author}!`);
      });
    }
    return () => socket?.off('new-community-post');
  }, [socket]);

  const handlePost = async () => {
    if (newMessage.trim()) {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post('http://localhost:5000/api/user/community/posts', {
          text: newMessage,
          tags: ['General'],
          isSuccessStory: newMessage.toLowerCase().includes('grade') || newMessage.toLowerCase().includes('sgpa')
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // The socket will handle adding it to the list or we can handle it here
        setNewMessage('');
        toast.success('Strategy published to Network!');
      } catch (error) {
        toast.error('Broadcasting failed');
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`http://localhost:5000/api/user/community/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh posts or update locally
      fetchPosts();
    } catch (error) {
      toast.error('Interaction blocked');
    }
  };

  const handleShare = async (post) => {
    const shareData = {
      title: 'Scorion Intelligence Network',
      text: `${post.author} shared an insight: "${post.text.substring(0, 50)}..."`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Protocol Shared!');
      } else {
        await navigator.clipboard.writeText(`${shareData.text} \nView more at: ${shareData.url}`);
        toast.success('Link copied to neural link!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast.error('Sharing protocol failed');
      }
    }
  };



  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Premium Hero Section */}
      <div className="bg-slate-900 border-b border-white/5 py-12 lg:py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Scorion Intelligence Network</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-none">
                Peer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Intelligence.</span>
              </h1>
              <p className="text-slate-400 font-bold max-w-xl text-lg mt-4">
                Synchronize your academic strategies with the collective intelligence of the Scorion community.
              </p>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] text-center min-w-[120px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Nodes</p>
                  <p className="text-3xl font-black text-white">1.2k+</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] text-center min-w-[120px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Knowledge Shares</p>
                  <p className="text-3xl font-black text-indigo-400">850</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Sidebar - Faculty & Stats */}
          <div className="lg:col-span-3 space-y-8">
            {/* Faculty Status */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Clock className="w-4 h-4" /> Faculty Office Hours
               </h3>
                <div className="space-y-6">
                  {facultyList.map((faculty, idx) => (
                    <div key={idx} className="flex flex-col gap-1 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-black text-slate-900 leading-tight">{faculty.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{faculty.subject}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`w-2 h-2 rounded-full bg-current ${faculty.color} animate-pulse`}></span>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${faculty.color}`}>{faculty.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Knowledge Squads */}
             <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/20">
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                 <Users className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-black tracking-tight mb-2">Knowledge Squads</h3>
               <p className="text-sm font-bold text-indigo-100/70 mb-8 leading-relaxed">
                 Join domain-specific clusters to accelerate your research and performance.
               </p>
               <button className="w-full py-4 bg-white text-indigo-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-xl">
                 Discover Clusters
               </button>
             </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-8">
            {/* Post Interface */}
            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
               <div className="flex gap-6">
                 <div className="w-14 h-14 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center text-white font-black text-xl shadow-xl shadow-indigo-100">
                   {JSON.parse(localStorage.getItem('userData') || '{}').name?.charAt(0) || 'U'}
                 </div>
                 <div className="flex-1 space-y-4">
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-6 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400 min-h-[120px] resize-none"
                      placeholder="Broadcast an academic strategy or share an insight..."
                      value={newMessage}
                      maxLength={500}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="flex justify-end pr-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${newMessage.length >= 450 ? 'text-rose-500' : 'text-slate-400'}`}>
                        {newMessage.length} / 500
                      </span>
                    </div>
                   <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all border border-slate-100">
                          <BookOpen size={18} />
                        </button>
                        <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all border border-slate-100">
                          <FileText size={18} />
                        </button>
                      </div>
                      <button 
                        onClick={handlePost}
                        className="px-10 py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3 active:scale-95"
                      >
                        <Send size={16} /> Broadcast Insight
                      </button>
                   </div>
                 </div>
               </div>
            </div>

            {/* Strategy Feed */}
            <div className="space-y-8">
              {posts.map((post) => (
                <div 
                  key={post.id}
                  className={`bg-white rounded-[3rem] p-10 shadow-xl shadow-indigo-500/5 border transition-all duration-300 ${post.isSuccessStory ? 'border-indigo-100' : 'border-slate-100'}`}
                >
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[1.2rem] flex items-center justify-center text-indigo-600 font-black text-xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-black text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">
                            {post.author}
                          </h4>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{post.role} • {post.time}</p>
                        </div>
                        {post.isSuccessStory && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                            <Award size={12} className="font-black" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Success Story</span>
                          </div>
                        )}
                      </div>

                      <p className="text-slate-600 font-bold leading-relaxed text-base mb-6 break-words whitespace-pre-wrap">
                        {post.text}
                      </p>

                      <div className="flex gap-2 mb-8">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-black px-3 py-1 bg-slate-50 text-slate-500 rounded-full uppercase tracking-widest border border-slate-100">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-slate-50 flex items-center gap-8">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group"
                        >
                           <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
                           <span className="text-xs font-black">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group">
                           <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                           <span className="text-xs font-black">{post.replies} Replies</span>
                        </button>
                        <button 
                          onClick={() => handleShare(post)}
                          className="ml-auto text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                           <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Trending & Analytics */}
          <div className="lg:col-span-3 space-y-8">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4" /> Global Trending
               </h3>
               <div className="space-y-6">
                 {[
                   { tag: '#NumericalMethods_HELP', count: 156, growth: '+12%' },
                   { tag: '#BCA_Android_Notes', count: 89, growth: '+5%' },
                   { tag: '#SGPA_Target_8.5', count: 245, growth: '+18%' }
                 ].map((trend, i) => (
                   <div key={i} className="group cursor-pointer">
                     <p className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{trend.tag}</p>
                     <div className="flex justify-between items-center mt-1">
                        <p className="text-[9px] font-bold text-slate-400">{trend.count} interactions</p>
                        <p className="text-[9px] font-black text-emerald-500">{trend.growth}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Network Protocol</h3>
                <p className="text-xl font-black mb-4 tracking-tight">Sync your progress to unlock the network.</p>
                <div className="space-y-4">
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-3/4"></div>
                   </div>
                   <p className="text-[9px] font-bold text-slate-500 text-center uppercase">75% Synchronization Level</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}