package com.pkolt.flashlight;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private CameraManager cameraManager;
    private boolean isFlashOn = false;
    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button = findViewById(R.id.button);

        if (!isFlashAvailable()) {
            // If the flashlight is not available on the device, disable the button
            button.setEnabled(false);
            return;
        }

        cameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
    }

    public void onButtonClick(View view) {
        try {
            if (isFlashOn) {
                turnOffFlash();
            } else {
                turnOnFlash();
            }
        } catch (CameraAccessException e) {
            e.printStackTrace();
        }
    }

    private boolean isFlashAvailable() {
        return getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH);
    }

    private void turnOnFlash() throws CameraAccessException {
        isFlashOn = true;
        cameraManager.setTorchMode(cameraManager.getCameraIdList()[0], isFlashOn);
        updateButton();
    }

    private void turnOffFlash() throws CameraAccessException {
        isFlashOn = false;
        cameraManager.setTorchMode(cameraManager.getCameraIdList()[0], isFlashOn);
        updateButton();
    }

    private void updateButton() {
        button.setText(getString(isFlashOn ? R.string.turn_off : R.string.turn_on));
        button.setBackgroundColor(ContextCompat.getColor(this, isFlashOn ? R.color.crimson : R.color.purple));
    }
}