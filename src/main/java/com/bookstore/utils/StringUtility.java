package com.bookstore.utils;

public class StringUtility {
    public static boolean isBlank(String str){
        if(str == null || str.isEmpty()) return true;
        return false;
    }
}
