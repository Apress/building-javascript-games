"use strict";

if (!Math.sign) {
    Math.sign = function (value) {
        if (value > 0)
            return 1;
        else if (value < 0)
            return -1;
        else
            return 0;
    };
}

if (!Math.clamp) {
    Math.clamp = function (value, min, max) {
        if (value < min)
            return min;
        else if (value > max)
            return max;
        else
            return value;
    };
}