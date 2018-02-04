; int C = scanf();
; printf(C);

section .bss
	C resb 5

section .text
	global _start

_start:
	mov eax, 3
	mov ebx, 2
	mov ecx, C
	mov edx, 5
	int 80h

	mov eax, 4
	mov ebx, 1
	mov ecx, C
	mov edx, 5
	int 80h

	mov eax, 1
	mov ebx, 0
	int 80h
