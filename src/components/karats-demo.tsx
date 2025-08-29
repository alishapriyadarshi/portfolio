
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

// Mock GoldAPI data
const mockApiData = {
    "timestamp": 1708443900,
    "metal": "XAU",
    "currency": "USD",
    "exchange": "FOREXCOM",
    "symbol": "FOREXCOM:XAUUSD",
    "prev_close_price": 2024.29,
    "open_price": 2024.29,
    "low_price": 2022.01,
    "high_price": 2031.57,
    "open_time": 1708387200,
    "price": 2029.57,
    "ch": 5.28,
    "chp": 0.26,
    "ask": 2029.67,
    "bid": 2029.47,
    "price_gram_24k": 65.25,
    "price_gram_22k": 59.81,
    "price_gram_21k": 57.1,
    "price_gram_20k": 54.38,
    "price_gram_18k": 48.94
};

// Mock AsyncStorage
const mockAsyncStorage = {
    getItem: async (key: string) => {
        if (key === 'apiData') {
            return JSON.stringify({
                timestamp: new Date().getTime(),
                data: mockApiData,
                refreshCount: 1
            });
        }
        return null;
    },
    setItem: async (key: string, value: string) => {
        console.log(`[Mock AsyncStorage] Setting ${key}:`, value);
    }
};

export function KaratsDemo() {
    const [apiData, setApiData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (forceRefresh = false) => {
        setLoading(true);
        setError(null);

        try {
            const cachedData = await mockAsyncStorage.getItem('apiData');
            const parsedData = cachedData ? JSON.parse(cachedData) : null;
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const cachedTimestamp = parsedData ? new Date(parsedData.timestamp).getTime() : 0;
            const isCacheFromToday = cachedTimestamp >= today;

            if (parsedData && isCacheFromToday && parsedData.refreshCount >= 2 && !forceRefresh) {
                setError("You have reached your daily refresh limit.");
                setApiData(parsedData.data);
                return;
            }
            
            // Simulate API fetch
            console.log(forceRefresh ? "Forcing API refresh..." : "Fetching new data...");
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

            const newRefreshCount = isCacheFromToday ? (parsedData?.refreshCount || 0) + 1 : 1;
            
            const newData = {
                timestamp: now.getTime(),
                data: mockApiData,
                refreshCount: newRefreshCount
            };
            
            await mockAsyncStorage.setItem('apiData', JSON.stringify(newData));
            setApiData(newData.data);

        } catch (e: any) {
            setError("Failed to fetch data. Displaying cached version.");
            const cachedData = await mockAsyncStorage.getItem('apiData');
            if (cachedData) {
                setApiData(JSON.parse(cachedData).data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600">
                        Karats
                    </h1>
                    <p className="text-sm text-muted-foreground">Live Metal Prices</p>
                </div>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500 text-sm mb-2">{error}</p>}
                
                {apiData && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                            <div>
                                <p className="text-lg font-semibold">Gold (XAU)</p>
                                <p className="text-xs text-gray-400">per ounce</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">${apiData.price.toFixed(2)}</p>
                                <p className={`text-sm ${apiData.ch >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {apiData.ch.toFixed(2)} ({apiData.chp.toFixed(2)}%)
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-muted rounded">
                                <p className="text-muted-foreground">24k/gram</p>
                                <p className="font-semibold">${apiData.price_gram_24k.toFixed(2)}</p>
                            </div>
                            <div className="p-2 bg-muted rounded">
                                <p className="text-muted-foreground">22k/gram</p>
                                <p className="font-semibold">${apiData.price_gram_22k.toFixed(2)}</p>
                            </div>
                            <div className="p-2 bg-muted rounded">
                                <p className="text-muted-foreground">18k/gram</p>
                                <p className="font-semibold">${apiData.price_gram_18k.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                <Button onClick={() => fetchData(true)} className="w-full mt-4" disabled={loading}>
                    {loading ? 'Refreshing...' : 'Refresh Data'}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-2">
                    Offline mode and daily refresh limit of 2 is simulated.
                </p>
            </CardContent>
        </Card>
    );
}
