#!/bin/bash
GAME_FILE="/home/syed-imadulla/Desktop/portfolio/CodeFury_9.0/src/components/sections/Game.tsx"
DEST_FILE="/home/syed-imadulla/Desktop/portfolio/imadulla-portfolio/src/components/StickManGame.tsx"

# We want to replace the `StickManGame` with the exact logic from `Game`
# 1. Change export function Game() to export function StickManGame()
# 2. Remove the outer <section id="game" ...> and return the motion.div directly.

cat $GAME_FILE | sed 's/export function Game()/export function StickManGame()/' | sed 's/export default Game;//' > temp.tsx

# Wait, instead of complicated sed, I can just output temp.tsx and then edit the return statement.
