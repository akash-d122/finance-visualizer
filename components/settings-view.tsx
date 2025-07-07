"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, FileText, Download, Upload, Bell, Palette } from "lucide-react"

export function SettingsView() {
  return (
    <div className="space-y-4 sm:space-y-6 max-w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your application preferences and data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Data Management */}
        <Card className="bg-white border border-gray-200 shadow-sm h-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              <span className="truncate">Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Export Data</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Download your financial data as CSV</p>
              </div>
              <Button variant="outline" size="sm" disabled className="flex-shrink-0 text-xs sm:text-sm bg-transparent">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Export
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Import Data</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Upload transactions from CSV file</p>
              </div>
              <Button variant="outline" size="sm" disabled className="flex-shrink-0 text-xs sm:text-sm bg-transparent">
                <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Import
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-white border border-gray-200 shadow-sm h-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              <span className="truncate">Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Notifications</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage alert preferences</p>
              </div>
              <Button variant="outline" size="sm" disabled className="flex-shrink-0 text-xs sm:text-sm bg-transparent">
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Configure
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Theme</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Switch between light and dark mode</p>
              </div>
              <Button variant="outline" size="sm" disabled className="flex-shrink-0 text-xs sm:text-sm bg-transparent">
                <Palette className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Theme
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Monthly Report</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
                Detailed monthly financial summary
              </p>
              <Button variant="outline" size="sm" disabled className="w-full bg-transparent text-xs sm:text-sm">
                Generate
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              </Button>
            </div>

            <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Tax Report</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">Annual tax calculation report</p>
              <Button variant="outline" size="sm" disabled className="w-full bg-transparent text-xs sm:text-sm">
                Generate
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              </Button>
            </div>

            <div className="p-3 sm:p-4 border border-gray-200 rounded-lg sm:col-span-2 lg:col-span-1">
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Budget Analysis</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
                Budget vs actual spending analysis
              </p>
              <Button variant="outline" size="sm" disabled className="w-full bg-transparent text-xs sm:text-sm">
                Generate
                <Badge variant="secondary" className="ml-2 text-xs">
                  Soon
                </Badge>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
