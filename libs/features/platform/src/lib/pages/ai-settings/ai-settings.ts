import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'platform-ai-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, CheckboxModule, InputTextModule, TextareaModule, Select],
  templateUrl: './ai-settings.html',
})
export class AiSettingsPage {
  providers = [{ name: 'OpenAI' }, { name: 'Anthropic' }, { name: 'Azure OpenAI' }];
  models = [{ name: 'gpt-4o-mini' }, { name: 'gpt-4.1' }, { name: 'claude-3.5-sonnet' }];
  toneOptions = [{ name: 'Professional' }, { name: 'Friendly' }, { name: 'Academic' }];

  selectedProvider = this.providers[0];
  selectedModel = this.models[0];
  selectedTone = this.toneOptions[0];

  apiKey = '';
  baseUrl = '';
  systemPrompt = '';
  maxTokens = 2048;
  temperature = 0.7;
  topP = 1;
  requestsPerMinute = 60;
  enableModeration = true;
  logPrompts = false;
  allowFileTools = true;

  save() {
    // Placeholder for save action.
  }
}
