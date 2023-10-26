import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypingBox from '@/app/[lang]/chat/components/TypingBox';
import { Chat } from '@/app/i18n/dictionaries/types';

// Mock the insertMessage and handleImageUpload functions
const insertMessage = jest.fn();
const handleImageUpload = jest.fn();

// Mock the useState functions
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initial: any) => [initial, jest.fn()],
}));

describe('TypingBox', () => {
    const chatObject: Chat = {
        conversations: "Conversations",
        you: "You",
        sent: "Sent",
        newconversation: "New Conversation",
        newconvlabel1: "New Conv Label 1",
        newconvlabel2: "New Conv Label 2",
        uploadedfile: "Uploaded File",
        chathome: "Chat Home"
    };
    it('deve permitir upload de imagem', () => {
        render(<TypingBox dict={chatObject} idsala="1" userId="123" />);

        const imageUploadButton = screen.getByTestId('image-upload-button'); // Replace with the actual button text

        fireEvent.change(imageUploadButton, {
            target: {
                files: [new File(['image contents'], 'image.png', { type: 'image/png' })],
            },
        });

        expect(handleImageUpload).toHaveBeenCalledWith(expect.any(File));
        // You can add assertions for the expected behavior here
    });

    // it('deve permitir inserção de mensagem', () => {
    //     render(<TypingBox dict={chatObject} idsala="1" userId="123" />);

    //     const textarea = screen.getByRole('textbox');
    //     fireEvent.change(textarea, { target: { value: 'Hello, World!' } });

    //     // You can add assertions for the expected behavior here
    // });

    // it('deve permitir inserção de emoji', () => {
    //     render(<TypingBox dict={chatObject} idsala="1" userId="123" />);

    //     const emojiButton = screen.getByText('Insert Emoji'); // Replace with the actual button text

    //     fireEvent.click(emojiButton);

    //     // Find an emoji in the emoji picker and click on it
    //     const emoji = screen.getByText('😀'); // Replace with the desired emoji
    //     fireEvent.click(emoji);

    //     // You can add assertions for the expected behavior here
    // });
});
