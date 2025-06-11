"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, FileText, MapPin } from "lucide-react"
import Link from "next/link"

interface Pendaftar {
  nama: string
  matematika: number
  ipa: number
  ips: number
  bindo: number
  jarak: number
}

export default function PendaftarPage() {
  const [pendaftarList, setPendaftarList] = useState<Pendaftar[]>([])
  const router = useRouter()

  useEffect(() => {
    const guruLoggedIn = localStorage.getItem("guruLoggedIn")
    if (!guruLoggedIn) {
      router.push("/guru")
      return
    }

    const data = JSON.parse(localStorage.getItem("pendaftarList") || "[]")
    setPendaftarList(data)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("guruLoggedIn")
    router.push("/")
  }

  const calculateAverage = (pendaftar: Pendaftar) => {
    return ((pendaftar.matematika + pendaftar.ipa + pendaftar.ips + pendaftar.bindo) / 4).toFixed(2)
  }

  const getStatusBadge = (average: number) => {
    if (average > 65) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Berpotensi Diterima</Badge>
    } else {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
          Perlu Peningkatan
        </Badge>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/guru">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout} className="text-slate-600">
            Keluar
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-lg border-slate-200 mb-8">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Data Semua Pendaftar</CardTitle>
              <CardDescription className="text-slate-600">
                Total pendaftar: {pendaftarList.length} siswa
              </CardDescription>
            </CardHeader>
          </Card>

          {pendaftarList.length > 0 ? (
            <div className="grid gap-6">
              {pendaftarList.map((pendaftar, index) => {
                const average = Number.parseFloat(calculateAverage(pendaftar))
                return (
                  <Card key={index} className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800">{pendaftar.nama}</h3>
                              <p className="text-sm text-slate-600">Pendaftar #{index + 1}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                              <div className="text-lg font-bold text-slate-800">{pendaftar.matematika}</div>
                              <div className="text-xs text-slate-600">Matematika</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                              <div className="text-lg font-bold text-slate-800">{pendaftar.ipa}</div>
                              <div className="text-xs text-slate-600">IPA</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                              <div className="text-lg font-bold text-slate-800">{pendaftar.ips}</div>
                              <div className="text-xs text-slate-600">IPS</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                              <div className="text-lg font-bold text-slate-800">{pendaftar.bindo}</div>
                              <div className="text-xs text-slate-600">B. Indonesia</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>Jarak: {pendaftar.jarak} km</span>
                            </div>
                            <div className="font-medium">Rata-rata: {average}</div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(average)}
                          <div className="text-2xl font-bold text-slate-800">{average}</div>
                          <div className="text-xs text-slate-600">Rata-rata</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="shadow-lg border-slate-200">
              <CardContent className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Belum Ada Pendaftar</h3>
                <p className="text-slate-600">Data pendaftar akan muncul di sini setelah ada siswa yang mendaftar</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
