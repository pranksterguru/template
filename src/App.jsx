import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import LLMJudge from './pages/LLMJudge';
import LLMJudgeConfig from './pages/LLMJudgeConfig';
import LLMJudgeReport from './pages/LLMJudgeReport';
import LLMJudgePlayground from './pages/LLMJudgePlayground';
import LLMJudgeDB from './pages/LLMJudgeDB';

const App = () => {
  return (
    <Routes>
      {/* Redirect root `/` to login page */}
      <Route path="/" element={<Navigate to="/LoginPage" replace />} />
      <Route path="/LoginPage" element={<LoginPage />} />

      {/* Wrap all layout-based routes under MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/llmjudge" element={<LLMJudge />} />
        <Route path="/llmjudgeconfig" element={<LLMJudgeConfig />} />
        <Route path="/llmjudgereport" element={<LLMJudgeReport />} />
        <Route path="/llmjudgeplayground" element={<LLMJudgePlayground />} />
        <Route path="/llmjudgedb" element={<LLMJudgeDB />} />

      </Route>
    </Routes>
  );
};

export default App;
