import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizationList from '../components/OrganizationList';
import DonationModal from '../components/DonationModal';
import { Organization } from '../types';

const Organizations: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const handleOrganizationSelect = (organization: Organization) => {
    navigate(`/organization/${organization.id}`);
  };

  const handleDonate = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsDonationModalOpen(true);
  };

  const handleDonationComplete = (donationDetails: any) => {
    console.log('Donation completed:', donationDetails);
    // Here you would typically:
    // 1. Update the organization's fund data
    // 2. Show a success notification
    // 3. Possibly refresh the organization list
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrganizationList
          onOrganizationSelect={handleOrganizationSelect}
          onDonate={handleDonate}
          showDonateButton={true}
        />
      </div>

      {/* Donation Modal */}
      {selectedOrganization && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => {
            setIsDonationModalOpen(false);
            setSelectedOrganization(null);
          }}
          organization={selectedOrganization}
          onDonationComplete={handleDonationComplete}
        />
      )}
    </div>
  );
};

export default Organizations;
