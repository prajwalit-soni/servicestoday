"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 2,
          position: "relative",
          overflow: "visible",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      {/* Top Close Window Icon */}
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: "#9E9E9E",
          "&:hover": { color: "#424242" },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <DialogContent sx={{ textAlign: "center", pt: 3, pb: 2 }}>
        {/* Warning Icon Container Circle */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "#FCE8E6", // Light red background border ring
            border: "4px solid #FEEAE6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#E51C23", // Deep solid red inner core
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberRoundedIcon sx={{ color: "#FFFFFF", fontSize: 24 }} />
          </Box>
        </Box>

        {/* Modal Core Headers */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#000000",
            fontSize: "22px",
            mb: 1.5,
          }}
        >
          Are you sure?
        </Typography>

        <Typography
          sx={{
            color: "#757575",
            fontSize: "14px",
            lineHeight: 1.5,
            px: 2,
            mb: 4,
          }}
        >
          This action can't be undone. Please confirm if you want to proceed.
        </Typography>

        {/* Action Button Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={loading}
            sx={{
              flex: 1,
              maxWidth: 140,
              borderColor: "#000000",
              color: "#000000",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              py: 1,
              fontSize: "14px",
              "&:hover": {
                borderColor: "#424242",
                backgroundColor: "rgba(0, 0, 0, 0.02)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
            sx={{
              flex: 1,
              maxWidth: 140,
              backgroundColor: "#E51C23", // Perfect red button tone
              color: "#FFFFFF",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              py: 1,
              fontSize: "14px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#D32F2F",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
