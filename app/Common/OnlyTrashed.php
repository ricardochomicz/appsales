<?php

namespace App\Common;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait OnlyTrashed
{
    protected function onlyTrashedIfRequest(Request $request, Builder $query)
    {
        if($request->get('trashed') == 1)
        {
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}