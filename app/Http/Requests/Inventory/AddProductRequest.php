<?php

namespace App\Http\Requests\Inventory;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sku' => ['required', 'string', 'max:60'],
            'name' => ['required', 'string', 'max:255'],
            'unit' => [
            'required',
                Rule::in([
                    'pcs',
                    'roll',
                    'box',
                    'bundle',
                    'ton',
                    'kg',
                    'meter',
                ]),
            ],
            'price' => ['required', 'numeric', 'min:0'],
            'stocks' => ['required', 'integer', 'min:0'],
            'min_stock' => ['required', 'integer', 'min:0'],
        ];
    }
}
