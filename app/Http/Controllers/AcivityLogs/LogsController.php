<?php

namespace App\Http\Controllers\AcivityLogs;

use App\Http\Controllers\Controller;
use Spatie\Activitylog\Models\Activity;
use Inertia\Inertia;
use App\Http\Resources\ActivityLogResource;

class LogsController extends Controller
{
    public function index()
    {
        $logs = ActivityLogResource::collection(
            Activity::with(['causer:id,name', 'subject'])
            ->latest()->paginate(20)
        );

        // dd($logs);
        

        return Inertia::render('activity-logs', [
            'logs' => $logs
        ]);
    }
}
