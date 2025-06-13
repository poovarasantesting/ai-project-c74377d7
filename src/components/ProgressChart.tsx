import { useEffect, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mock data - would come from a database in a real app
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Bench Press (lbs)',
        data: [135, 145, 150, 160],
        color: 'rgba(124, 58, 237, 1)'
      },
      {
        label: 'Squat (lbs)',
        data: [185, 195, 205, 215],
        color: 'rgba(16, 185, 129, 1)'
      }
    ]
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
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
      const value = Math.round(250 - (250 / horizontalLines) * i);
      ctx.fillText(value.toString(), padding - 5, y + 3);
    }
    
    // Draw x-axis labels
    ctx.textAlign = 'center';
    const xStep = chartWidth / (chartData.labels.length - 1);
    
    chartData.labels.forEach((label, i) => {
      const x = padding + xStep * i;
      ctx.fillText(label, x, canvas.height - padding + 15);
    });
    
    // Draw datasets
    chartData.datasets.forEach((dataset, datasetIndex) => {
      ctx.beginPath();
      
      dataset.data.forEach((value, i) => {
        const x = padding + (chartWidth / (dataset.data.length - 1)) * i;
        const normalizedValue = (value - 100) / 150; // Normalize between 100-250
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
    chartData.datasets.forEach((dataset, i) => {
      const x = padding + (i * 120);
      
      ctx.fillStyle = dataset.color;
      ctx.fillRect(x, legendY, 10, 10);
      
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'left';
      ctx.fillText(dataset.label, x + 15, legendY + 8);
    });
    
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select defaultValue="month">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last 3 Months</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px] w-full">
        <canvas ref={canvasRef} className="h-full w-full"></canvas>
      </div>
      <div className="flex justify-center text-sm text-muted-foreground">
        Select different exercises from the dropdown to track progress
      </div>
    </div>
  );
}