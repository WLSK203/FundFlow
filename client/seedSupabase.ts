import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { createClient } from '@supabase/supabase-js';
import { mockOrganizations } from './src/services/mockData';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in client/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding Supabase...");

  for (const org of mockOrganizations) {
    const { error } = await supabase.from('organizations').upsert({
      id: org.id,
      name: org.name,
      registrationNumber: org.registrationNumber,
      type: org.type,
      category: org.category,
      trustScore: org.trustScore,
      trustTrend: org.trustTrend,
      description: org.description,
      website: org.website,
      email: org.email,
      phone: org.phone,
      address: org.address,
      totalFundsReceived: org.totalFundsReceived,
      totalFundsDisbursed: org.totalFundsDisbursed,
      verificationStatus: org.verificationStatus,
      donationEnabled: org.donationEnabled,
      donationMethods: org.donationMethods,
      impact: org.impact,
      financialTransparency: org.financialTransparency,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt
    });

    if (error) {
      console.error(`Error inserting ${org.name}:`, error.message);
    } else {
      console.log(`Inserted: ${org.name}`);
    }
  }
  console.log("Seeding complete!");
}

seed().catch(console.error);
