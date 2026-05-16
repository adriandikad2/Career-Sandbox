import { NextRequest, NextResponse } from 'next/server';
import { generateMockScenario } from '@/lib/generate-scenario';
import { validateScenarioForm } from '@/lib/validation';
import type { GenerateRequest, GenerateResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json();
    const { formData } = body;

    // ─── Validate input ────────────────────────────────
    const validation = validateScenarioForm(formData);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: validation.errors.map((e) => e.message).join(' '),
        uncertainty: 95,
      });
    }

    // ─── Simulate processing delay (1.5s) ──────────────
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // ─── Generate scenario ─────────────────────────────
    const scenario = generateMockScenario(formData);

    // ─── Check for extreme uncertainty ─────────────────
    if (scenario.overallConfidence < 10) {
      return NextResponse.json({
        success: false,
        error: 'Gagal Memetakan Jalur. Kombinasi target dan constraint ini menghasilkan tingkat ketidakpastian yang terlalu tinggi.',
        uncertainty: 100 - scenario.overallConfidence,
      });
    }

    return NextResponse.json({
      success: true,
      scenario,
    });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        uncertainty: 100,
      },
      { status: 500 }
    );
  }
}
