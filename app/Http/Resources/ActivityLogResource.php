<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->created_at,
            'user' => data_get($this->properties, 'user'),
            'action' => $this->description,
            'item' => data_get($this->properties, 'name'),
            'sku'=> data_get($this->properties,'sku'),
        ];
    }
}
