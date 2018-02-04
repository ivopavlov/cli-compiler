; A = 10;
; B = 5;
;
; printf(A);
; printf(B);

section .text
	global _start

_start:
	mov eax, 4
	mov ebx, 1
	mov ecx, A
	mov edx, lenA
	int 80h

	mov eax, 4
	mov ebx, 1
	mov ecx, B
	mov edx, lenB
	int 80h

	mov	eax,1       ;system call number (sys_exit)
	int	80h        ;call kernel

section .data
	A db '10'
	lenA equ $ - A
	B db '5'
	lenB equ $ - B
