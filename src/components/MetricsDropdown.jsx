import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import Tooltip from '@mui/joy/Tooltip';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const MetricsDropdown = forwardRef(({ metricData = [] }, ref) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
const [selected, setSelected] = useState([]);

useEffect(() => {
  if (metricData.length > 0) {
    setSelected(metricData.map(m => ({ ...m })));
  }
}, [metricData]);

  useImperativeHandle(ref, () => ({
    getValue: () => selected,
  }));

  const toggleMetric = (metric) => {
    setSelected((prev) => {
      const existing = prev.find((m) => m.name === metric.name);
      if (existing) {
        return prev.filter((m) => m.name !== metric.name);
      } else {
        return [...prev, { ...metric }];
      }
    });
  };

  const handleThresholdChange = (metricName, key, value) => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue >= 0 && intValue <= 100) {
      setSelected((prev) =>
        prev.map((m) =>
          m.name === metricName
            ? {
                ...m,
                thresholds: {
                  ...m.thresholds,
                  [key]: intValue,
                },
              }
            : m
        )
      );
    }
  };

  const toggleDropdown = () => setOpen((o) => !o);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Box sx={{ maxWidth: 500, width: '100%', position: 'relative' }} ref={dropdownRef}>
      <Box
        onClick={toggleDropdown}
        sx={{
          border: '1px solid',
          borderColor: 'neutral.outlinedBorder',
          borderRadius: 'md',
          px: 2,
          py: 1,
          bgcolor: 'background.surface',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="body-sm">
          {selected.length > 0
            ? selected.map((m) => m.name).join(', ')
            : 'Select metrics'}
        </Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>

      {open && (
        <Sheet
          variant="outlined"
          sx={{
            mt: 1,
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            p: 2,
            borderRadius: 'md',
            boxShadow: 'lg',
          }}
        >
          {metricData.map((metric) => {
            const selectedMetric = selected.find((m) => m.name === metric.name);
            return (
              <Box key={metric.name} sx={{ mb: 2 }}>
                <Tooltip title={metric.description}>
                  <Checkbox
                    checked={!!selectedMetric}
                    onChange={() => toggleMetric(metric)}
                    label={metric.name}
                  />
                </Tooltip>
                {selectedMetric && (
                  <Box sx={{ mt: 1, pl: 3, display: 'flex', gap: 1 }}>
                    <Input
                      size="sm"
                      type="number"
                      placeholder="Red"
                      value={selectedMetric.thresholds.red}
                      onChange={(e) =>
                        handleThresholdChange(metric.name, 'red', e.target.value)
                      }
                      sx={{
                        width: 80,
                        '& input': {
                          color: '#c62828', // red
                        },
                      }}
                    />
                    <Input
                      size="sm"
                      type="number"
                      placeholder="Amber"
                      value={selectedMetric.thresholds.amber}
                      onChange={(e) =>
                        handleThresholdChange(metric.name, 'amber', e.target.value)
                      }
                      sx={{
                        width: 80,
                        '& input': {
                          color: '#ff8f00', // amber
                        },
                      }}
                    />
                    <Input
                      size="sm"
                      type="number"
                      placeholder="Green"
                      disabled
                      value={selectedMetric.thresholds.green}
                      onChange={(e) =>
                        handleThresholdChange(metric.name, 'green', e.target.value)
                      }
                      sx={{
                        width: 80,
                        '& input': {
                          color: '#2e7d32', // green
                        },
                      }}
                    />
                  </Box>
                )}
              </Box>
            );
          })}
        </Sheet>
      )}
    </Box>
  );
});

export default MetricsDropdown;
