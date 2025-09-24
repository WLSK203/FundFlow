import React, { useState, useRef } from 'react';
import { CameraIcon, MapPinIcon, StarIcon, TrophyIcon, FireIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, FireIcon as FireIconSolid } from '@heroicons/react/24/solid';

interface AuditSubmission {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'report' | 'complaint';
  projectId: string;
  media?: File;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'pending' | 'verified' | 'rejected';
  votes: {
    upvotes: number;
    downvotes: number;
  };
  reward: number;
  submittedAt: Date;
}

interface UserGamification {
  points: number;
  level: number;
  badges: string[];
  streak: number;
  contributions: number;
}

const CommunityAudit: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submission, setSubmission] = useState<{
    title: string;
    description: string;
    type: 'photo' | 'report' | 'complaint';
    media: File | null;
    location: any;
  }>({
    title: '',
    description: '',
    type: 'photo',
    media: null,
    location: null
  });
  const [userStats, setUserStats] = useState<UserGamification>({
    points: 2,
    level: 15,
    badges: ['first-audit', 'photo-verifier', 'community-champion'],
    streak: 7,
    contributions: 23
  });
  const [recentAudits, setRecentAudits] = useState<AuditSubmission[]>([
    {
      id: '1',
      title: 'School Construction Progress',
      description: 'New classroom block foundation completed as planned',
      type: 'photo',
      projectId,
      status: 'verified',
      votes: { upvotes: 45, downvotes: 2 },
      reward: 50,
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Quality Concern - Road Materials',
      description: 'Substandard materials being used for road construction',
      type: 'complaint',
      projectId,
      status: 'pending',
      votes: { upvotes: 23, downvotes: 5 },
      reward: 75,
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSubmission(prev => ({ ...prev, media: file }));
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSubmission(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
            }
          }));
        },
        (error) => {
          console.error('Location access denied:', error);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAudit: AuditSubmission = {
      id: Date.now().toString(),
      title: submission.title,
      description: submission.description,
      type: submission.type,
      projectId,
      status: 'pending',
      votes: { upvotes: 0, downvotes: 0 },
      reward: submission.type === 'complaint' ? 75 : 50,
      submittedAt: new Date()
    };

    setRecentAudits(prev => [newAudit, ...prev]);
    setUserStats(prev => ({
      ...prev,
      points: prev.points + newAudit.reward,
      contributions: prev.contributions + 1,
      streak: prev.streak + 1
    }));

    // Reset form
    setSubmission({
      title: '',
      description: '',
      type: 'photo',
      media: null,
      location: null
    });
    setShowSubmissionForm(false);
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'first-audit': return '🏆';
      case 'photo-verifier': return '📸';
      case 'community-champion': return '👑';
      default: return '🏅';
    }
  };

  const getBadgeName = (badge: string) => {
    switch (badge) {
      case 'first-audit': return 'First Audit';
      case 'photo-verifier': return 'Photo Verifier';
      case 'community-champion': return 'Community Champion';
      default: return 'Achievement';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* User Gamification Stats */}
      <div className="bg-gradient-to-r from-primary-600 to-trust-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Community Impact Dashboard</h2>
          <div className="flex items-center space-x-2">
            <FireIconSolid className="h-6 w-6 text-orange-300" />
            <span className="text-lg font-semibold">{userStats.streak} day streak!</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{userStats.points.toLocaleString()}</div>
            <div className="text-sm opacity-90">Points Earned</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">Level {userStats.level}</div>
            <div className="text-sm opacity-90">Current Level</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{userStats.contributions}</div>
            <div className="text-sm opacity-90">Contributions</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{userStats.badges.length}</div>
            <div className="text-sm opacity-90">Badges Earned</div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Recent Badges</h3>
          <div className="flex space-x-3">
            {userStats.badges.map((badge, index) => (
              <div key={index} className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
                <span className="mr-2">{getBadgeIcon(badge)}</span>
                <span className="text-sm">{getBadgeName(badge)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Form */}
      {showSubmissionForm ? (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-neutral-900">Submit Community Audit</h3>
            <button
              onClick={() => setShowSubmissionForm(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Audit Type
              </label>
              <select
                value={submission.type}
                onChange={(e) => setSubmission(prev => ({ ...prev, type: e.target.value as 'photo' | 'report' | 'complaint' }))}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="photo">Photo Evidence</option>
                <option value="report">Progress Report</option>
                <option value="complaint">Quality Concern</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={submission.title}
                onChange={(e) => setSubmission(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Brief title for your submission"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={submission.description}
                onChange={(e) => setSubmission(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={4}
                placeholder="Detailed description of what you observed..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary-500 transition-colors"
                >
                  <CameraIcon className="h-5 w-5 mr-2 text-neutral-500" />
                  {submission.media ? submission.media.name : 'Upload Photo/Video'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={requestLocation}
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary-500 transition-colors"
                >
                  <MapPinIcon className="h-5 w-5 mr-2 text-neutral-500" />
                  {submission.location ? 'Location Added' : 'Add GPS Location'}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowSubmissionForm(false)}
                className="px-6 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Submit Audit (Earn {submission.type === 'complaint' ? '75' : '50'} points)
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => setShowSubmissionForm(true)}
            className="inline-flex items-center px-6 py-3 bg-trust-600 text-white rounded-lg font-semibold hover:bg-trust-700 transition-colors"
          >
            <CameraIcon className="h-5 w-5 mr-2" />
            Submit Community Audit
          </button>
        </div>
      )}

      {/* Recent Audits */}
      <div className="bg-white rounded-xl shadow-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-xl font-bold text-neutral-900">Recent Community Audits</h3>
          <p className="text-neutral-600 mt-1">Community-verified project updates and concerns</p>
        </div>

        <div className="divide-y divide-neutral-200">
          {recentAudits.map((audit) => (
            <div key={audit.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      audit.type === 'photo' ? 'bg-blue-100 text-blue-800' :
                      audit.type === 'report' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {audit.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      audit.status === 'verified' ? 'bg-trust-100 text-trust-800' :
                      audit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {audit.status}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {audit.submittedAt.toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">{audit.title}</h4>
                  <p className="text-neutral-600 mt-1">{audit.description}</p>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-trust-600">+{audit.reward} pts</div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <button className="flex items-center mr-3 hover:text-trust-600">
                      <span className="mr-1">👍</span>
                      {audit.votes.upvotes}
                    </button>
                    <button className="flex items-center hover:text-red-600">
                      <span className="mr-1">👎</span>
                      {audit.votes.downvotes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
          <TrophyIcon className="h-6 w-6 mr-2 text-yellow-600" />
          Community Leaderboard
        </h3>
        
        <div className="space-y-3">
          {[
            { name: 'You', points: userStats.points, rank: 1, avatar: '👤' },
            { name: 'Priya Sharma', points: 2180, rank: 2, avatar: '👩' },
            { name: 'Raj Kumar', points: 1950, rank: 3, avatar: '👨' },
            { name: 'Anita Singh', points: 1820, rank: 4, avatar: '👩‍💼' }
          ].map((user, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
              user.name === 'You' ? 'bg-primary-50 border border-primary-200' : 'bg-neutral-50'
            }`}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mr-3 ${
                  user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  user.rank === 2 ? 'bg-gray-400 text-gray-900' :
                  user.rank === 3 ? 'bg-orange-400 text-orange-900' :
                  'bg-neutral-300 text-neutral-700'
                }`}>
                  {user.rank}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{user.name}</div>
                  <div className="text-sm text-neutral-600">{user.points.toLocaleString()} points</div>
                </div>
              </div>
              <div className="text-2xl">{user.avatar}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityAudit;
