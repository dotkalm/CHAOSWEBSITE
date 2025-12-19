'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { subscribeToNewsletter, emailRegex } from '@/utils'; 
import { COPY } from '@/constants';
import { styles } from '@/styles/styles';

export default function Subscribe() {
    const theme = useTheme();
    const { newsletter: { messages: mailingList, labels } } = COPY;
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
                    setIsSubmitting(false);
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
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                ...styles.main
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    marginBottom: 2,
                }}
            >
                <em>CHAOS Of</em> is where CHAOS Agency untangles the beautifully disordered art world—past, present, and on-chain. Each episode, Amanda Schmitt and Janet Chuang break down how art really works behind the scenes, from the old systems to the new futures colliding to replace them.
            </Typography>
            <Box
                component="form"
                onSubmit={submitHandler}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    border: '1px solid',
                    borderColor: 'text.primary',
                    maxWidth: '100%',
                    height: '3.5rem',
                    padding: '0 1rem',
                    overflow: 'hidden', // Add this to prevent overflow
                }}
            >
                <Box
                    onBlur={handleBlur}
                    onChange={handleChange}
                    component="input"
                    type="email"
                    autoComplete="email"
                    value={enteredText}
                    placeholder={labels.placeholder}
                    sx={{
                        border: 'none',
                        flex: 1,
                        minWidth: 0, // Add this to allow input to shrink below its content width
                        ...theme.typography.body1,
                        fontFamily: 'inherit',
                        backgroundColor: 'transparent',
                        color: 'inherit',
                        '&::placeholder': {
                            ...theme.typography.body1,
                            color: 'rgba(0, 0, 0, 0.4)',
                        },
                        '&:focus': {
                            outline: 'none',
                        },
                    }}
                />
                {statusMessage && (
                    <Typography
                        variant='body1'
                        sx={{
                            alignItems: 'center',
                            color: '#000',
                            display: 'flex',
                            paddingRight: '1rem',
                        }}
                    >
                        {statusMessage}
                    </Typography>
                )}
                <Box
                    type="submit"
                    component='button'
                    sx={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontFamily: 'inherit',
                        whiteSpace: 'nowrap',
                        padding: '0',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                        ...theme.typography.body1,
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
                        </Box>
                    ) : (
                        <Typography
                            variant='body1'
                            sx={{
                                color: '#000',
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
                }}
            >
                {COPY.newsletter.caption}
            </Typography>
        </Box >
    );
}