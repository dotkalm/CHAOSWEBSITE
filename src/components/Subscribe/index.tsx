'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { subscribeToNewsletter, emailRegex } from '@/utils'; 
import { COPY } from '@/constants';

export default function Subscribe() {
    const { newsletter: { messages: mailingList, labels }} = COPY;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [enteredText, setEnteredText] = useState<string>("");
    const [error, setError] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();
    const statusMessage = error ? error : successMessage;

    function handleBlur() {
        if (successMessage) setSuccessMessage(undefined);
        if (enteredText !== "" && !emailRegex.test(enteredText)) {
            setError(mailingList.validationMessage);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (error) setError("");
        if (successMessage) setSuccessMessage(undefined);
        setEnteredText(event.target.value);
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        try {
            setSuccessMessage(undefined);
            event.preventDefault();
            if (!error && enteredText !== "") {
                setIsSubmitting(true);
                if (!emailRegex.test(enteredText)) {
                    setError(mailingList.validationMessage);
                } else {
                    const response = await subscribeToNewsletter({ email: enteredText })
                    if (response === 'Successfully subscribed to newsletter') {
                        setSuccessMessage(mailingList.successMessage);
                    }
                    setIsSubmitting(false);
                }
            }
        } catch {
            setIsSubmitting(false);
            setError(mailingList.validationMessage);
        }
    }

      return (
    <Box
      sx={{
        maxWidth: {
          xs: '100%',
          sm: '600px',
        }
      }}
    >
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
        }}
      >
        {COPY.newsletter.description}
      </Typography>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px solid',
          borderColor: 'text.primary',
          maxWidth: '100%',
          height: '3.5rem',
        }}
      >
        <Box
          onBlur={handleBlur}
          onChange={handleChange}
          component="input"
          type="email"
          autoComplete="email"
          value={enteredText && enteredText}
          placeholder={labels.placeholder}
          sx={{
            border: 'none',
            flex: 1,
            padding: '0 1rem',
            fontSize: '1rem',
            fontFamily: 'inherit',
            backgroundColor: 'transparent',
            color: 'inherit',
            '&::placeholder': {
              color: 'rgba(0, 0, 0, 0.4)',
            },
            '&:focus': {
              outline: 'none',
            },
          }}
        />
        <Box
          type="submit"
          component='button'
          sx={{
            border: 'none',
            backgroundColor: 'transparent',
            padding: '0 1rem',
            fontFamily: 'inherit',
            fontSize: '1rem',
            whiteSpace: 'nowrap',
            '&:hover': {
              cursor: 'pointer',
            }
          }}
        >
          {isSubmitting ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <CircularProgress 
                size={24} 
              />
              <Typography
                variant='body1'
                sx={{
                  paddingLeft: '.5rem',
                  display: 'inline'
                }}
              >
                Subscribing...
              </Typography>
            </Box>
          ) : (
            <Typography
              variant='body1'
              sx={{
                paddingLeft: '.5rem',
              }}
            >
              {labels.subscribe}
            </Typography>
          )
        }
        </Box>
      </Box>
      <Typography
        variant='body2'
        sx={{
          marginTop: 2,
          fontSize: '0.75rem',
        }}
      >
        {COPY.newsletter.caption}
      </Typography>
      {statusMessage && (
        <Typography
          variant='body2'
          sx={{
            marginTop: 1,
            color: error ? 'error.main' : 'success.main',
          }}
        >
          {statusMessage}
        </Typography>
      )}
    </Box >
  );
}