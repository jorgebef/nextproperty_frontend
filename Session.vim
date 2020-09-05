let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/nextproperty_frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +42 src/App.tsx
badd +69 src/Dashboard/Edit/Edit.tsx
badd +2 src/Dashboard/Shared/Loading/Loading.tsx
badd +23 src/Dashboard/Create/Create.tsx
badd +63 src/SharedGlobal/helperFuncs/crud.helpers.ts
badd +1 src/SharedGlobal/vars.ts
badd +5 src/SharedGlobal/types.ts
badd +59 src/Dashboard/List/ListDash.tsx
argglobal
%argdel
edit src/Dashboard/Shared/Loading/Loading.tsx
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
wincmd =
argglobal
let s:l = 2 - ((1 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
2
normal! 018|
wincmd w
argglobal
if bufexists("src/Dashboard/Edit/Edit.tsx") | buffer src/Dashboard/Edit/Edit.tsx | else | edit src/Dashboard/Edit/Edit.tsx | endif
if &buftype ==# 'terminal'
  silent file src/Dashboard/Edit/Edit.tsx
endif
let s:l = 69 - ((32 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
69
normal! 051|
wincmd w
wincmd =
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
