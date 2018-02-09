section .bss
f resb 1
section .text
global _start
_start:
mov eax, 3
mov ebx, 2
mov ecx, f
mov edx, 1
int 80h

mov eax, 4
mov ebx, 1
mov ecx, f
mov edx, 1
int 80h

mov eax,1
mov ebx, 0
int 80h
