"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Globe, Shield, Users } from 'lucide-react';

export default function TraceKeyHomepage() {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TraceKey
            </span>
          </div>
          <div className="flex space-x-3">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge 
            variant="secondary" 
            className="mb-6 bg-white/60 text-slate-700 border border-white/20 backdrop-blur-sm"
          >
            🚀 Advanced Website Analytics Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Welcome to TraceKey
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Get your own TraceKey to track your website visitors with comprehensive analytics including 
            <span className="font-semibold text-slate-800"> IP addresses, device information, </span>
            and everything you need to understand your audience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Started - Sign Up
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
            >
              Already have an account? Login
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">IP Tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Track visitor IP addresses and geographical locations to understand your global audience reach.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Device Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Get detailed insights about visitor devices, browsers, operating systems, and screen resolutions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Visitor Insights</h3>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive visitor behavior analysis with real-time tracking and detailed reporting.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to start tracking?
              </h2>
              <p className="text-blue-100 mb-6 text-lg">
                Join thousands of websites already using TraceKey for powerful analytics
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-full shadow-lg"
                >
                  Create Your TraceKey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full"
                >
                  View Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20">
        <div className="text-center text-slate-500">
          <p>&copy; 2025 TraceKey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
