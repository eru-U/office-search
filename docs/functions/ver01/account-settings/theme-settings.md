# 機能詳細定義書：テーマ・外観設定機能 (Ver0.1 / MVP版)

## 概要
アプリケーションの見た目（カラーモード）をユーザーの好みに合わせて切り替える機能。
`next-themes` と `Tailwind CSS` の標準機能を活用する。

## 1. データ構造
- LocalStorage または Cookie に設定値を保存 (DB保存は不要)
- 設定キー: `theme`
- 値: `light` | `dark` | `system`

## 2. 設定操作 (Appearance Page)

### 2-1. カラーモード切り替え
- UI: 3つのラジオボタンまたはトグルスイッチ
  - **Light**: 常時ライトモード
  - **Dark**: 常時ダークモード
  - **System**: デバイスの設定（OSの設定）に追従

### 2-2. アクセントカラー設定 (Nice to have for MVP)
- アプリ全体のメインカラー（ボタンやリンクの色）を変更する機能
- プリセット: Blue (Default), Green, Orange, Violet, Slate
- ※Tailwindのクラス付与ルール（CSS Variables）で制御する

## 3. カットした機能
- フォントサイズの変更機能
- 背景画像のカスタマイズ