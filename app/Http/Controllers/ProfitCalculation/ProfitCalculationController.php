<?php

namespace App\Http\Controllers\ProfitCalculation;

use App\Http\Controllers\Controller;
use App\Models\ProfitCalculation;
use Inertia\Inertia;
use App\Http\Requests\ProfitAddRequest;
use App\Http\Requests\FilterRequest;

class ProfitCalculationController extends Controller
{
    public function index(FilterRequest $request)
    {
        // dd($request);
        $category = $request->validated('category');

        $query = ProfitCalculation::query();

        if ($category) {
            $query->where('category', $category);
        }

        return Inertia::render('profit_calculator', [
            'ProfitData' => $query->latest()->get(),
        ]);
    }

    public function store(ProfitAddRequest $request)
    {
        ProfitCalculation::create($request->validated());
    }

    public function destroy(ProfitCalculation $ProfitCalculation)
    {
        $ProfitCalculation->delete();
    }

    public function calculator(FilterRequest $request)
    {
        $status = $request->validated('category');

        $query = ProfitCalculation::query();

        if ($status === 'Pending' || !$status) {
            $query->whereIn('status', ['Pending', 'Revoked']);
        } else {
            $query->where('status', $status);
        }

        return Inertia::render('calculator', [
            'ProfitData' => $query->latest()->get(),
        ]);
    }

    // public function index(ApprovalFilterRequest $request)
    // {
    //     $status = $request->validated('category');

    //     $query = Participant::query();

    //     if ($status === 'Pending' || !$status) {
    //         $query->whereIn('status', ['Pending', 'Revoked']);
    //     } else {
    //         $query->where('status', $status);
    //     }

    //     return Inertia::render('approval', [
    //         'participants' => $query->latest()->get(),
    //     ]);
        
    // }
}
