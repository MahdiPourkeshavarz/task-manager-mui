import React from "react";
import { Box, Button, Stack } from "@mui/material";
import type { FilterStatus } from "../types";

interface FilterButtonProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const filters: FilterStatus[] = ["all", "pending", "completed"];

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ width: "100%" }}
      >
        {filters.map((filter) => (
          <Button
            key={filter}
            onClick={() => onFilterChange(filter)}
            variant={currentFilter === filter ? "contained" : "outlined"}
            sx={{
              flex: 1,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
          >
            {filter}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterButton;
