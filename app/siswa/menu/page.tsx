"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Calculator, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SiswaMenu() {
  const [nama, setNama] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/siswa")
      return
    }

    setNama(currentUser)

    // Check if user is already registered
    const pendaftarList = JSON.parse(localStorage.getItem("pendaftarList") || "[]")
    const userRegistered = pendaftarList.some((p: any) => p.nama === currentUser)
    setIsRegistered(userRegistered)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!nama) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/siswa">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout} className="text-slate-600">
            Keluar
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Selamat datang, {nama}!</h1>
            <p className="text-slate-600">Pilih menu yang tersedia untuk melanjutkan proses PPDB</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {!isRegistered && (
              <Card className="hover:shadow-lg transition-shadow duration-300 border-slate-200">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">Daftar Sekarang</CardTitle>
                  <CardDescription className="text-slate-600">
                    Lengkapi formulir pendaftaran PPDB dengan data nilai Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href="/siswa/daftar">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Mulai Pendaftaran</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {isRegistered && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-800">Sudah Terdaftar</CardTitle>
                  <CardDescription className="text-green-700">
                    Anda telah menyelesaikan proses pendaftaran PPDB
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            <Card className="hover:shadow-lg transition-shadow duration-300 border-slate-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Simulasi Nilai</CardTitle>
                <CardDescription className="text-slate-600">
                  Coba simulasi nilai untuk melihat prediksi kelulusan Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/siswa/simulasi">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Mulai Simulasi</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
