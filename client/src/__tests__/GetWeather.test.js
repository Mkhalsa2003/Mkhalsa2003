import React from 'react';
import Axios from 'axios';
import GetWeather from '../GetWeather';
import { render, screen } from "@testing-library/react";

jest.mock('axios');

describe('GetWeather', () => {
    beforeEach(() => {
        global.navigator.geolocation = {
            getCurrentPosition: jest.fn().mockImplementationOnce(success =>
                success({
                    coords: {
                        latitude: 51.1,
                        longitude: 45.3
                    }
                })
            ),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Speech recognition is not supported in the browser', async () => {
        window.SpeechRecognition = undefined;
        render(<GetWeather />);
        expect(await screen.findByText("Browser doesn't support speech recognition.", {}, { timeout: 5000 })).toBeInTheDocument();
    });

    describe('Speech recognition is supported in the browser', () => {
        let mockUseSpeechRecognition;

        beforeEach(() => {
            mockUseSpeechRecognition = jest.fn();
            mockUseSpeechRecognition.mockReturnValue({
                transcript: 'Change to Fahrenheit',
                listening: false,
                resetTranscript: jest.fn(),
                browserSupportsSpeechRecognition: true,
            });
            window.SpeechRecognition = jest.fn().mockImplementation(() => ({
                start: jest.fn(),
                stop: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            }));
        });
        jest.setTimeout(10000); // increase timeout to 10 seconds
        test.each([
            ['Change to Fahrenheit', 'F'],
            ['Change to Celsius', 'C'],
            ['Change to Kelvin', 'K'],
            ['Something else', ''],
        ])('User says "%s"', async (transcript, expectedPreference) => {
            mockUseSpeechRecognition.mockReturnValueOnce({
                transcript,
                listening: false,
                resetTranscript: jest.fn(),
                browserSupportsSpeechRecognition: true,
            });
            const mockdata = { data: { forecastType: expectedPreference } }
            const mockdata2 = {
                data: {
                    properties: {
                        periods: [
                            { name: 'Today', isDaytime: true, temperature: 70, icon: 'icon1' },
                            { name: 'Tomorrow', isDaytime: true, temperature: 80, icon: 'icon2' },
                            { name: 'Tonight', isDaytime: false, temperature: 60, icon: 'icon3' },
                            { name: 'Tomo Night', isDaytime: false, temperature: 70, icon: 'icon4' },
                        ],
                    },
                },
            }

            Axios.post.mockReturnValueOnce(Promise.resolve(mockdata));
            Axios.get.mockReturnValueOnce(Promise.resolve(mockdata2));

            render(<GetWeather />);

            expect(await screen.findByText('Today', {}, { timeout: 5000 })).toBeInTheDocument();
            expect(await screen.findByText('70', {}, { timeout: 5000 })).toBeInTheDocument();
            expect(await screen.findByText(expectedPreference, {}, { timeout: 5000 })).toBeInTheDocument();
        });
    });
});