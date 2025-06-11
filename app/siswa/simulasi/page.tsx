"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Calculator, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface SimulasiData {
  matematika: number
  ipa: number
  ips: number
  bindo: number
  hasil: string
  rataRata: number
}

export default function SimulasiPage() {
  const [nama, setNama] = useState("")
  const [formData, setFormData] = useState({
    matematika: "",
    ipa: "",
    ips: "",
    bindo: "",
  })
  const [hasil, setHasil] = useState<string | null>(null)
  const [rataRata, setRataRata] = useState<number | null>(null)
  const [histori, setHistori] = useState<SimulasiData[]>([])
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/siswa")
      return
    }
    setNama(currentUser)

    // Load simulation history
    const simulasiHistori = JSON.parse(localStorage.getItem("simulasiHistori") || "{}")
    if (simulasiHistori[currentUser]) {
      setHistori(simulasiHistori[currentUser])
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nilai = {
      matematika: Number.parseInt(formData.matematika),
      ipa: Number.parseInt(formData.ipa),
      ips: Number.parseInt(formData.ips),
      bindo: Number.parseInt(formData.bindo),
    }

    const rata = (nilai.matematika + nilai.ipa + nilai.ips + nilai.bindo) / 4
    const hasilSimulasi = rata > 65 ? "Diterima" : "Ditolak"

    setRataRata(rata)
    setHasil(hasilSimulasi)

    // Save to history
    const newData: SimulasiData = {
      ...nilai,
      hasil: hasilSimulasi,
      rataRata: rata,
    }

    const updatedHistori = [...histori, newData]
    setHistori(updatedHistori)

    // Save to localStorage
    const simulasiHistori = JSON.parse(localStorage.getItem("simulasiHistori") || "{}")
    simulasiHistori[nama] = updatedHistori
    localStorage.setItem("simulasiHistori", JSON.stringify(simulasiHistori))

    // Reset form
    setFormData({ matematika: "", ipa: "", ips: "", bindo: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!nama) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/siswa/menu">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Menu
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Simulation Form */}
            <Card className="shadow-lg border-slate-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Simulasi Nilai</CardTitle>
                <CardDescription className="text-slate-600">
                  Masukkan nilai untuk melihat prediksi kelulusan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="matematika" className="text-slate-700">
                        Matematika
                      </Label>
                      <Input
                        id="matematika"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.matematika}
                        onChange={(e) => handleInputChange("matematika", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-purple-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ipa" className="text-slate-700">
                        IPA
                      </Label>
                      <Input
                        id="ipa"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.ipa}
                        onChange={(e) => handleInputChange("ipa", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-purple-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ips" className="text-slate-700">
                        IPS
                      </Label>
                      <Input
                        id="ips"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.ips}
                        onChange={(e) => handleInputChange("ips", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-purple-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bindo" className="text-slate-700">
                        Bahasa Indonesia
                      </Label>
                      <Input
                        id="bindo"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.bindo}
                        onChange={(e) => handleInputChange("bindo", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Lihat Hasil Simulasi
                  </Button>
                </form>

                {hasil && rataRata !== null && (
                  <Alert
                    className={`mt-4 ${hasil === "Diterima" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                  >
                    <div className="flex items-center space-x-2">
                      {hasil === "Diterima" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <AlertDescription className={hasil === "Diterima" ? "text-green-700" : "text-red-700"}>
                        <strong>Hasil Simulasi: {hasil}</strong>
                        <br />
                        Rata-rata nilai: {rataRata.toFixed(2)}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* History */}
            <Card className="shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Histori Simulasi</CardTitle>
                <CardDescription className="text-slate-600">
                  Riwayat simulasi nilai yang pernah Anda lakukan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {histori.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {histori.map((item, index) => (
                      <div key={index} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Simulasi #{histori.length - index}</span>
                          <div className="flex items-center space-x-1">
                            {item.hasil === "Diterima" ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span
                              className={`text-sm font-medium ${item.hasil === "Diterima" ? "text-green-700" : "text-red-700"}`}
                            >
                              {item.hasil}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-slate-600">
                          <div className="grid grid-cols-2 gap-2">
                            <span>Mat: {item.matematika}</span>
                            <span>IPA: {item.ipa}</span>
                            <span>IPS: {item.ips}</span>
                            <span>B.Indo: {item.bindo}</span>
                          </div>
                          <div className="mt-1 font-medium">Rata-rata: {item.rataRata.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">Belum ada histori simulasi</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
