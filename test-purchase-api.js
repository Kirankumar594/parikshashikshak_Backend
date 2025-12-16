const axios = require('axios');

const BASE_URL = 'http://localhost:8774/api/admin/purchase';

async function testPurchaseAPI() {
  try {
    console.log('Testing Purchase API endpoints...\n');

    // Test 1: Get subscription plans for 1st standard
    console.log('1. Testing GET /api/admin/purchase/plans/1st');
    try {
      const response = await axios.get(`${BASE_URL}/plans/1st`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.data.length} subscription plans for 1st standard`);
      
      if (response.data.data.length > 0) {
        const firstPlan = response.data.data[0];
        console.log(`✅ Sample plan: ${firstPlan.standard} - ${firstPlan.subject}`);
        console.log(`✅ Annual cost: ₹${firstPlan.plans.annual.totalCost}`);
        console.log(`✅ First half cost: ₹${firstPlan.plans.firstHalf.totalCost}`);
        
        // Store subscription ID for purchase test
        global.testSubscriptionId = firstPlan.id;
      }
    } catch (error) {
      console.log(`❌ Error: ${error.response?.data?.message || error.message}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Test purchase subscription
    if (global.testSubscriptionId) {
      console.log('2. Testing POST /api/admin/purchase/subscribe');
      try {
        const purchaseData = {
          userId: "test_user_123",
          subscriptionId: global.testSubscriptionId,
          planType: "annual",
          standard: "1st",
          subject: "Kannda FL"
        };

        const response = await axios.post(`${BASE_URL}/subscribe`, purchaseData);
        console.log(`✅ Status: ${response.status}`);
        console.log(`✅ Purchase initiated successfully`);
        console.log(`✅ Payment ID: ${response.data.data.paymentId}`);
        console.log(`✅ Amount: ₹${response.data.data.amount}`);
      } catch (error) {
        console.log(`❌ Error: ${error.response?.data?.message || error.message}`);
      }
    }

    console.log('\n🎉 Purchase API testing completed!');

  } catch (error) {
    console.error('Test suite failed:', error.message);
  }
}

testPurchaseAPI();