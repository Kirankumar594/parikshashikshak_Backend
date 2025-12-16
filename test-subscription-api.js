const axios = require('axios');

// Base URL for your API (adjust port if needed)
const BASE_URL = 'http://localhost:8774/api/admin/subscriptions';

async function testSubscriptionAPI() {
  try {
    console.log('Testing Subscription API endpoints...\n');

    // Test 1: Get all subscriptions
    console.log('1. Testing GET /api/admin/subscriptions');
    try {
      const response = await axios.get(BASE_URL);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.count} subscriptions`);
      
      if (response.data.data.length > 0) {
        console.log(`✅ Sample subscription: ${response.data.data[0].standard} - ${response.data.data[0].subject}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Get subscription pricing for specific standard and subject
    console.log('2. Testing GET /api/admin/subscriptions/pricing/1st/Kannda');
    try {
      const response = await axios.get(`${BASE_URL}/pricing/1st/Kannda`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Pricing data:`, JSON.stringify(response.data.data.pricing, null, 2));
    } catch (error) {
      console.log(`❌ Error: ${error.response?.data?.message || error.message}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Create a new subscription
    console.log('3. Testing POST /api/admin/subscriptions (Create new)');
    const newSubscription = {
      standard: "Test Standard",
      subject: "Test Subject",
      assessmentCounts: {
        lba: 5,
        fa1: 2,
        fa2: 2,
        sa1: 1,
        midTerm: 10
      },
      pricing: {
        lbaPrice: 150,
        fa1Price: 50,
        fa2Price: 50,
        sa1Price: 75,
        midTermCost: 325,
        annualCost: 650
      }
    };

    try {
      const response = await axios.post(BASE_URL, newSubscription);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Created subscription ID: ${response.data.data._id}`);
      
      // Store ID for cleanup
      global.testSubscriptionId = response.data.data._id;
    } catch (error) {
      console.log(`❌ Error: ${error.response?.data?.message || error.message}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 4: Update the created subscription
    if (global.testSubscriptionId) {
      console.log('4. Testing PUT /api/admin/subscriptions/:id (Update)');
      try {
        const updateData = {
          pricing: {
            ...newSubscription.pricing,
            annualCost: 700 // Update annual cost
          }
        };
        
        const response = await axios.put(`${BASE_URL}/${global.testSubscriptionId}`, updateData);
        console.log(`✅ Status: ${response.status}`);
        console.log(`✅ Updated annual cost to: ${response.data.data.pricing.annualCost}`);
      } catch (error) {
        console.log(`❌ Error: ${error.response?.data?.message || error.message}`);
      }

      console.log('\n' + '='.repeat(50) + '\n');

      // Test 5: Delete the test subscription
      console.log('5. Testing DELETE /api/admin/subscriptions/:id (Cleanup)');
      try {
        const response = await axios.delete(`${BASE_URL}/${global.testSubscriptionId}`);
        console.log(`✅ Status: ${response.status}`);
        console.log(`✅ Test subscription deleted successfully`);
      } catch (error) {
        console.log(`❌ Error: ${error.response?.data?.message || error.message}`);
      }
    }

    console.log('\n🎉 API testing completed!');

  } catch (error) {
    console.error('Test suite failed:', error.message);
  }
}

// Run the tests
testSubscriptionAPI();