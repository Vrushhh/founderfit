import { TEST_PERSONAS } from '../src/lib/data/testPersonas';
import { generateBusinessRecommendation } from '../src/lib/engine/recommendationEngine';
import { paymentService } from '../src/lib/services/paymentService';

async function runValidationTests() {
  console.log('🚀 Running NEXTMOVE Test Persona & Engine Validation...\n');

  let allPassed = true;

  for (const persona of TEST_PERSONAS) {
    console.log(`--------------------------------------------------`);
    console.log(`👤 Testing Persona: ${persona.name}`);
    console.log(`   Description: ${persona.roleDescription}`);
    console.log(`   Expected Outcome: ${persona.expectedOutcome}`);

    const result = generateBusinessRecommendation(persona.answers);

    console.log(`   ▶ Archetype: ${result.primaryArchetype.name} (${result.primaryArchetype.tagline})`);
    console.log(`   ▶ Primary Blueprint: ${result.primaryBlueprint.name}`);
    console.log(`   ▶ Fit Score: ${result.primaryBlueprint.fitScore}/100`);
    console.log(`   ▶ Capital: ${result.primaryBlueprint.capitalRange}`);
    console.log(`   ▶ Time: ${result.primaryBlueprint.timeCommitment}`);
    console.log(`   ▶ First Target: ${result.primaryBlueprint.firstTarget}`);
    console.log(`   ▶ Alternative Blueprint: ${result.alternativeBlueprint.name}`);
    console.log(`   ▶ Personalized Reasons (${result.primaryBlueprint.whyThisFitsYou.length}):`);
    result.primaryBlueprint.whyThisFitsYou.forEach((r, idx) => console.log(`      ${idx + 1}. ${r}`));

    // Assertions
    if (!result.primaryBlueprint.name) {
      console.error(`❌ FAILED: No primary blueprint generated for ${persona.name}`);
      allPassed = false;
    }
    if (result.primaryBlueprint.fitScore < 80 || result.primaryBlueprint.fitScore > 98) {
      console.error(`❌ FAILED: Fit score out of expected realistic range: ${result.primaryBlueprint.fitScore}`);
      allPassed = false;
    }
    if (result.primaryBlueprint.whyThisFitsYou.length < 4) {
      console.error(`❌ FAILED: Expected at least 4 personalized reasons`);
      allPassed = false;
    }
    if (result.primaryBlueprint.first7Days.length !== 7) {
      console.error(`❌ FAILED: Expected exactly 7 days in launch sprint`);
      allPassed = false;
    }
    if (result.primaryBlueprint.first30Days.length !== 4) {
      console.error(`❌ FAILED: Expected exactly 4 weeks in validation plan`);
      allPassed = false;
    }
  }

  console.log(`\n--------------------------------------------------`);
  console.log('💳 Testing Payment Abstraction (Mock Mode)...');
  const order = await paymentService.createPayment({ amount: 299, blueprintId: 'test_bp' });
  console.log(`   Created Order: ${order.orderId}, Status: ${order.status}`);
  const verifyRes = await paymentService.verifyPayment({ orderId: order.orderId, paymentId: 'pay_123' });
  console.log(`   Payment Verification: ${verifyRes.success ? 'SUCCESS' : 'FAILED'}`);

  if (!verifyRes.success) {
    allPassed = false;
  }

  console.log(`--------------------------------------------------\n`);
  if (allPassed) {
    console.log('✅ ALL 5 TEST PERSONAS & ENGINE TESTS PASSED PERFECTLY!');
  } else {
    console.error('❌ SOME TESTS FAILED');
    process.exit(1);
  }
}

runValidationTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
