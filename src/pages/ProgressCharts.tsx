import { useState } from "react";
import { LineChart, BarChart2, PieChart, Calendar, Dumbbell, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function ProgressCharts() {
  const [timeRange, setTimeRange] = useState("3months");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Progress Charts</h1>
        <div className="flex items-center gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
        </div>
      </div>

      <Tabs defaultValue="strength" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="strength">
            <Dumbbell className="mr-2 h-4 w-4" />
            Strength
          </TabsTrigger>
          <TabsTrigger value="cardio">
            <Heart className="mr-2 h-4 w-4" />
            Cardio
          </TabsTrigger>
          <TabsTrigger value="body">
            <PieChart className="mr-2 h-4 w-4" />
            Body Metrics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="strength">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Bench Press Progress</CardTitle>
                <CardDescription>Your max weight over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <StrengthChart exercise="Bench Press" />
              </CardContent>
            </Card>
            
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Squat Progress</CardTitle>
                <CardDescription>Your max weight over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <StrengthChart exercise="Squat" />
              </CardContent>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Strength Comparison</CardTitle>
                <CardDescription>Your major lifts compared</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ComparisonChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cardio">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Running Performance</CardTitle>
                <CardDescription>Your pace over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CardioChart metric="Pace" />
              </CardContent>
            </Card>
            
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Heart Rate Zones</CardTitle>
                <CardDescription>Time spent in each zone</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <HeartRateChart />
              </CardContent>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Cardio Capacity</CardTitle>
                <CardDescription>VO2 max estimation over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CardioChart metric="VO2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="body">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Weight Tracking</CardTitle>
                <CardDescription>Your body weight over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BodyMetricChart metric="Weight" />
              </CardContent>
            </Card>
            
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Body Composition</CardTitle>
                <CardDescription>Muscle vs fat percentage</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CompositionChart />
              </CardContent>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Measurements</CardTitle>
                <CardDescription>Key body measurements over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <MeasurementsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StrengthChart({ exercise }: { exercise: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Draw data
    const data = exercise === "Bench Press" 
      ? [135, 145, 155, 160, 175, 185, 190] 
      : [185, 205, 225, 245, 265, 285, 315];
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const maxValue = Math.max(...data) * 1.2;
    
    // Draw horizontal grid lines
    const horizontalLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    for (let i = 0; i <= horizontalLines; i++) {
      const y = padding + (chartHeight / horizontalLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();
      
      // Y-axis labels
      const value = Math.round(maxValue - (maxValue / horizontalLines) * i);
      ctx.fillText(value.toString() + ' lbs', padding - 5, y + 3);
    }
    
    // Draw x-axis labels
    ctx.textAlign = 'center';
    const xStep = chartWidth / (labels.length - 1);
    
    labels.forEach((label, i) => {
      const x = padding + xStep * i;
      ctx.fillText(label, x, canvas.height - padding + 15);
    });
    
    // Draw line
    ctx.beginPath();
    data.forEach((value, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const normalizedValue = value / maxValue;
      const y = canvas.height - padding - (normalizedValue * chartHeight);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Draw points
      ctx.fillStyle = '#7c3aed';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [exercise]);
  
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}

function CardioChart({ metric }: { metric: 'Pace' | 'VO2' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Draw data
    const data = metric === "Pace" 
      ? [8.5, 8.2, 7.9, 7.7, 7.5, 7.3, 7.1] 
      : [38, 39, 41, 42, 43, 45, 46];
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const maxValue = Math.max(...data) * 1.2;
    const minValue = Math.min(...data) * 0.8;
    const range = maxValue - minValue;
    
    // Draw horizontal grid lines
    const horizontalLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    for (let i = 0; i <= horizontalLines; i++) {
      const y = padding + (chartHeight / horizontalLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();
      
      // Y-axis labels
      const value = maxValue - (range / horizontalLines) * i;
      const label = metric === "Pace" 
        ? value.toFixed(1) + ' min/mi' 
        : Math.round(value) + ' ml/kg/min';
      ctx.fillText(label, padding - 5, y + 3);
    }
    
    // Draw x-axis labels
    ctx.textAlign = 'center';
    const xStep = chartWidth / (labels.length - 1);
    
    labels.forEach((label, i) => {
      const x = padding + xStep * i;
      ctx.fillText(label, x, canvas.height - padding + 15);
    });
    
    // Draw line
    ctx.beginPath();
    data.forEach((value, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const normalizedValue = (value - minValue) / range;
      const y = canvas.height - padding - (normalizedValue * chartHeight);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Draw points
      ctx.fillStyle = metric === "Pace" ? '#10b981' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.strokeStyle = metric === "Pace" ? '#10b981' : '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [metric]);
  
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}

function HeartRateChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;
    
    // Heart rate zone data
    const zones = [
      { name: "Zone 1 (50-60%)", color: "#22c55e", value: 15 },
      { name: "Zone 2 (60-70%)", color: "#84cc16", value: 35 },
      { name: "Zone 3 (70-80%)", color: "#eab308", value: 30 },
      { name: "Zone 4 (80-90%)", color: "#f97316", value: 15 },
      { name: "Zone 5 (90-100%)", color: "#ef4444", value: 5 },
    ];
    
    const total = zones.reduce((sum, zone) => sum + zone.value, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(chartWidth, chartHeight) / 2;
    
    let startAngle = 0;
    
    // Draw pie segments
    zones.forEach((zone) => {
      const sliceAngle = (2 * Math.PI * zone.value) / total;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = zone.color;
      ctx.fill();
      
      // Draw label lines and text
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 1.2;
      const labelX = centerX + Math.cos(midAngle) * labelRadius;
      const labelY = centerY + Math.sin(midAngle) * labelRadius;
      
      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(midAngle) * radius, centerY + Math.sin(midAngle) * radius);
      ctx.lineTo(labelX, labelY);
      ctx.strokeStyle = zone.color;
      ctx.stroke();
      
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = labelX > centerX ? 'left' : 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${zone.name} - ${zone.value}%`, labelX, labelY);
      
      startAngle += sliceAngle;
    });
    
    // Draw inner circle for donut chart
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Add center text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('Heart Rate', centerX, centerY - 10);
    ctx.fillText('Zones', centerX, centerY + 10);
    
  }, []);
  
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}

function BodyMetricChart({ metric }: { metric: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Draw data
    const data = [185, 183, 181, 180, 178, 176, 175];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const maxValue = 190;
    const minValue = 170;
    const range = maxValue - minValue;
    
    // Draw horizontal grid lines
    const horizontalLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    for (let i = 0; i <= horizontalLines; i++) {
      const y = padding + (chartHeight / horizontalLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();
      
      // Y-axis labels
      const value = maxValue - (range / horizontalLines) * i;
      ctx.fillText(value.toString() + ' lbs', padding - 5, y + 3);
    }
    
    // Draw x-axis labels
    ctx.textAlign = 'center';
    const xStep = chartWidth / (labels.length - 1);
    
    labels.forEach((label, i) => {
      const x = padding + xStep * i;
      ctx.fillText(label, x, canvas.height - padding + 15);
    });
    
    // Draw area under line
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    
    data.forEach((value, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const normalizedValue = (value - minValue) / range;
      const y = canvas.height - padding - (normalizedValue * chartHeight);
      ctx.lineTo(x, y);
    });
    
    ctx.lineTo(padding + chartWidth, canvas.height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((value, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const normalizedValue = (value - minValue) / range;
      const y = canvas.height - padding - (normalizedValue * chartHeight);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Draw points
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw target weight line
    const targetWeight = 170;
    const targetY = canvas.height - padding - ((targetWeight - minValue) / range * chartHeight);
    
    ctx.beginPath();
    ctx.moveTo(padding, targetY);
    ctx.lineTo(canvas.width - padding, targetY);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw target label
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'left';
    ctx.fillText('Target: ' + targetWeight + ' lbs', padding + 5, targetY - 5);
    
  }, [metric]);
  
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}

function CompositionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Data sets
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const fatData = [22, 21, 20, 19, 18, 17, 16];
    const muscleData = [36, 37, 38, 39, 40, 41, 42];
    
    // Draw stacked bars
    const barWidth = chartWidth / labels.length * 0.7;
    const maxValue = 100; // Percentage scale
    
    labels.forEach((label, i) => {
      const x = padding + (chartWidth / labels.length) * i + (chartWidth / labels.length - barWidth) / 2;
      
      // Muscle bar (bottom)
      const muscleHeight = (muscleData[i] / maxValue) * chartHeight;
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x, canvas.height - padding - muscleHeight, barWidth, muscleHeight);
      
      // Fat bar (top)
      const fatHeight = (fatData[i] / maxValue) * chartHeight;
      ctx.fillStyle = '#f97316';
      ctx.fillRect(x, canvas.height - padding - muscleHeight - fatHeight, barWidth, fatHeight);
      
      // Other bar (remaining to 100%)
      const otherHeight = ((100 - muscleData[i] - fatData[i]) / maxValue) * chartHeight;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x, canvas.height - padding - muscleHeight - fatHeight - otherHeight, barWidth, otherHeight);
      
      // Label
      ctx.textAlign = 'center';
      ctx.fillStyle = '#64748b';
      ctx.fillText(label, x + barWidth / 2, canvas.height - padding + 15);
    });
    
    // Draw horizontal grid lines
    const horizontalLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    for (let i = 0; i <= horizontalLines; i++) {
      const y = padding + (chartHeight / horizontalLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();
      
      // Y-axis labels
      const value = 100 - (100 / horizontalLines) * i;
      ctx.fillText(value.toString() + '%', padding - 5, y + 3);
    }
    
    // Draw legend
    const legendY = padding / 2;
    
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padding, legendY, 10, 10);
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.fillText('Muscle', padding + 15, legendY + 8);
    
    ctx.fillStyle = '#f97316';
    ctx.fillRect(padding + 80, legendY, 10, 10);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Fat', padding + 95, legendY + 8);
    
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(padding + 140, legendY, 10, 10);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Other', padding + 155, legendY + 8);
    
  }, []);
  
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}

function MeasurementsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Data sets
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const datasets = [
      { label: 'Chest', data: [42, 42.5, 43, 43.5, 44, 44.5, 45], color: '#3b82f6' },
      { label: 'Arms', data: [14.5, 15, 15.5, 16, 16.5, 17, 17.5], color: '#10b981' },
      { label: 'Waist', data: [34, 33.5, 33, 32.5, 32, 31.5, 31], color: '#f97316' },
    ];
    
    // Draw horizontal grid lines
    const horizontalLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    for (let i = 0; i <= horizontalLines; i++) {
      const y = padding + (chartHeight / horizontalLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();
      
      // Y-axis labels
      const value = 50 - (40 / horizontalLines) * i;
      ctx.fillText(value.toString() + '"', padding - 5, y + 3);
    }
    
    // Draw x-axis labels
    ctx.textAlign = 'center';
    const xStep = chartWidth / (labels.length - 1);
    
    labels.forEach((label, i) => {
      const x = padding + xStep * i;
      ctx.fillText(label, x, canvas.height - padding + 15);
    });
    
    // Draw lines
    datasets.forEach((dataset) => {
      ctx.beginPath();
      
      const maxValue = 50;
      const minValue = 10;
      const range = maxValue - minValue;
      
      dataset.data.forEach((value, i) => {
        const x = padding + (chartWidth / (dataset.data.length - 1)) * i;
        const normalizedValue = (value - minValue) / range;
        const y = canvas.height - padding - (normalizedValue * chartHeight);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        // Draw points
        ctx.fillStyle = dataset.color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    // Draw legend
    const legendY = padding / 2;
    let legendX = padding;
    
    datasets.forEach((dataset) => {
      ctx.fillStyle = dataset.color;
      ctx.fillRect(legendX, legendY, 10, 10);
      
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'left';
      ctx.fillText(dataset.label, legendX + 15, legendY + 8);
      
      legendX += 80;
    });
    
  }, []);
  
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}

function ComparisonChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Data
    const exercises = ['Bench Press', 'Squat', 'Deadlift', 'Shoulder Press', 'Barbell Row'];
    const startWeights = [135, 185, 225, 95, 135];
    const currentWeights = [185, 315, 365, 135, 185];
    
    // Chart dimensions
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / exercises.length * 0.4;
    const barSpacing = chartWidth / exercises.length;
    
    // Max value for scaling
    const maxWeight = Math.max(...currentWeights) * 1.2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Draw horizontal grid lines
    const horizontalLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    for (let i = 0; i <= horizontalLines; i++) {
      const y = padding + (chartHeight / horizontalLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();
      
      // Y-axis labels
      const value = Math.round(maxWeight - (maxWeight / horizontalLines) * i);
      ctx.fillText(value.toString() + ' lbs', padding - 5, y + 3);
    }
    
    // Draw bars and labels
    exercises.forEach((exercise, i) => {
      const x = padding + (barSpacing * i) + (barSpacing - barWidth * 2) / 2;
      
      // Starting weight bar
      const startHeight = (startWeights[i] / maxWeight) * chartHeight;
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x, canvas.height - padding - startHeight, barWidth, startHeight);
      
      // Current weight bar
      const currentHeight = (currentWeights[i] / maxWeight) * chartHeight;
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(x + barWidth, canvas.height - padding - currentHeight, barWidth, currentHeight);
      
      // Exercise label
      ctx.textAlign = 'center';
      ctx.fillStyle = '#64748b';
      ctx.save();
      ctx.translate(x + barWidth, canvas.height - padding + 10);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(exercise, 0, 0);
      ctx.restore();
      
      // Weight labels
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px sans-serif';
      
      if (startHeight > 20) {
        ctx.fillText(startWeights[i].toString(), x + barWidth / 2, canvas.height - padding - startHeight / 2);
      }
      
      if (currentHeight > 20) {
        ctx.fillText(currentWeights[i].toString(), x + barWidth * 1.5, canvas.height - padding - currentHeight / 2);
      }
    });
    
    // Draw legend
    const legendY = padding / 2;
    
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(padding, legendY, 10, 10);
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.font = '10px sans-serif';
    ctx.fillText('Starting Weight', padding + 15, legendY + 8);
    
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(padding + 120, legendY, 10, 10);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Current Weight', padding + 135, legendY + 8);
    
  }, []);
  
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}