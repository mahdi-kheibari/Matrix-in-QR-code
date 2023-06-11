# Mathmatics Project: Usage of Matrices in QR codes

## Introduction

A QR code is a type of matrix barcode that can store various types of information, such as text, URLs, contact details, etc. A matrix barcode is a two-dimensional code that consists of black and white modules arranged in a square grid. QR code is the fastest matrix barcode to encode and decode, and it can store up to 7098 characters. A QR code can be scanned by a camera or a reader device and decoded using an algorithm that extracts the data from the patterns of the modules.

A matrix is a rectangular array of numbers or symbols that can represent data or operations. Matrices can be used to perform various mathematical operations, such as addition, subtraction, multiplication, inversion, etc. Matrices can also be used to encode and decode information, such as images, text, or codes.

In this text, we will learn how matrices are used to generate and read QR codes. We will cover the following topics:

 - How QR codes are structured and encoded
 - How QR codes are scanned and decoded
 - How matrices are involved in the encoding and decoding process
 - How matrices can be manipulated to create different types of QR codes

## QR Code Structure and Encoding

A QR code has four main components:

 - Finder patterns: These are three identical squares located at the corners of the QR code. They help the scanner to locate and orient the QR code.
 - Alignment patterns: These are smaller squares that are distributed along the edges of the QR code. They help the scanner to correct any distortion or skewing of the QR code.
 - Timing patterns: These are alternating black and white modules that run along the rows and columns of the QR code. They help the scanner to determine the size and position of each module.
 - Data and error correction codewords: These are the modules that contain the actual information encoded in the QR code. They also include some redundant data that can be used to correct any errors or damage in the QR code.

To encode information in a QR code, we need to follow these steps:

 - Convert the information into binary bits (0s and 1s) using one of the four encoding modes: numeric, alphanumeric, byte, or kanji.
 - Add a mode indicator (4 bits) and a character count indicator (9-12 bits) to indicate the type and length of the information.
 - Divide the bits into groups of 8 bits (bytes) and pad with extra bits if necessary to fill up the required number of codewords for the chosen version and error correction level of the QR code.
 - Apply an error correction algorithm (Reed-Solomon) to generate additional codewords that can be used to recover any lost or corrupted data.
 - Interleave the data and error correction codewords according to a predefined pattern for optimal distribution across the QR code.
 - Add a remainder bit (0) if necessary to make the total number of bits a multiple of 8.
 - Place the bits into the modules of the QR code following a zigzag pattern that starts from the bottom right corner and avoids the finder, alignment, and timing patterns.
 - Apply a mask pattern (one of eight possible patterns) to invert some of the modules to improve readability and reduce ambiguity. Choose the mask pattern that minimizes the penalty score based on four evaluation criteria: adjacent modules, blocks of modules, patterns similar to finder patterns, and imbalance between black and white modules.
 - Add a format information (15 bits) that indicates the error correction level and mask pattern used. Apply an error correction algorithm (BCH) to generate 10 additional bits that can be used to correct any errors in the format information.
 - Place the format information into predefined modules around the finder patterns.

## QR Code Scanning and Decoding

To scan and decode information from a QR code, we need to follow these steps:

 - Locate the finder patterns using an edge detection algorithm that identifies regions with high contrast between black and white modules.
 - Determine the orientation and size of the QR code based on the relative positions of the finder patterns.
 - Locate the alignment patterns using a correlation algorithm that matches their shape with a template.
 - Correct any distortion or skewing of the QR code using a perspective transformation algorithm that maps each module to its ideal position on a square grid.
 - Determine the version and error correction level of the QR code by reading and decoding (using BCH) the format information around the finder patterns.
 - Determine the mask pattern used by comparing each module with its corresponding position on each of
the eight possible mask patterns.
- Choose the mask pattern that matches the format information and apply it to
the QR code to restore
the original modules.
- Read
the bits from
the modules following
the reverse zigzag pattern that was used
to place them. Skip
the finder, alignment, and timing patterns.
- Deinterleave
the bits according
to the predefined pattern for
the chosen version and error correction level of
the QR code.
- Apply
the error correction algorithm (Reed-Solomon) to detect and correct any errors or damage in
the data and error correction codewords.
- Remove any extra bits that were added for padding or remainder.
- Read
the mode indicator (4 bits) and
the character count indicator (9-12 bits) to determine
the type and length of
the information.
- Convert
the bits into
the original information using
the appropriate decoding mode: numeric, alphanumeric, byte, or kanji.

## Matrices and QR Codes

Matrices are involved in both the encoding and decoding process of QR codes. Here are some examples of how matrices are used:

- A QR code can be represented as a matrix of binary values (0 or 1) that correspond to the black and white modules. For example, a 21 x 21 QR code can be represented as a 21 x 21 matrix of 0s and 1s.
- A mask pattern can be represented as a matrix of binary values (0 or 1) that indicate which modules should be inverted. For example, mask pattern 0 can be represented as a matrix where each element is equal to `(row + column) mod 2`.
- A format information can be represented as a matrix of binary values (0 or 1) that indicate which modules should contain the format bits. For example, format information can be represented as a matrix where each element is equal to `1` if it belongs to the format region, and `0` otherwise.
- An error correction algorithm (Reed-Solomon) can be implemented using matrix operations, such as multiplication, addition, inversion, etc. For example, to generate error correction codewords for a given message polynomial, we can multiply it by a generator matrix that depends on the number and degree of the codewords.
- A perspective transformation algorithm can be implemented using matrix operations, such as multiplication, inversion, etc. For example, to map each module from its distorted position on the image to its ideal position on a square grid, we can multiply its coordinates by a transformation matrix that depends on four control points.

## Matrices Manipulation and QR Codes

Matrices can also be manipulated to create different types of QR codes. Here are some examples of how matrices manipulation can affect QR codes:

- Changing the values of some elements in a QR code matrix can alter the information encoded in it. For example, flipping some bits from 0 to 1 or vice versa can change the meaning of a text or URL encoded in a QR code.
- Changing the values of some elements in a mask pattern matrix can alter the appearance of a QR code. For example, changing some elements from 0 to 1 or vice versa can create different patterns or shapes on a QR code.
- Changing the values of some elements in a format information matrix can alter the readability of a QR code. For example, changing some elements from 0 to 1 or vice versa can change the error correction level or mask pattern used for a QR code, which may affect its scanning performance.
- Changing the values of some elements in a transformation matrix can alter the perspective of a QR code. For example, changing some elements can create different effects such as rotation, scaling, shearing, etc. on a QR code.

## What Does This Repo Do

The code in this repository was written for a math project; the course was held in the Ferdowsi University of Mashhad by Dr. Rajabali Kamyabi Gol. We studied the usage of matrices in QR codes for our term project.

This website generates and reads ver1 QR codes and is written for educational purposes.

Hope you enjoy it.
