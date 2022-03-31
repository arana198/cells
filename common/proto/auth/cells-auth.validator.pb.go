// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: cells-auth.proto

package auth

import (
	fmt "fmt"
	math "math"
	proto "google.golang.org/protobuf/proto"
	github_com_mwitkow_go_proto_validators "github.com/mwitkow/go-proto-validators"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

func (this *Token) Validate() error {
	return nil
}
func (this *RevokeTokenRequest) Validate() error {
	if this.Token != nil {
		if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(this.Token); err != nil {
			return github_com_mwitkow_go_proto_validators.FieldError("Token", err)
		}
	}
	return nil
}
func (this *RevokeTokenResponse) Validate() error {
	return nil
}
func (this *PruneTokensRequest) Validate() error {
	return nil
}
func (this *PruneTokensResponse) Validate() error {
	return nil
}
func (this *ID) Validate() error {
	return nil
}
func (this *GetLoginRequest) Validate() error {
	return nil
}
func (this *GetLoginResponse) Validate() error {
	return nil
}
func (this *CreateLoginRequest) Validate() error {
	return nil
}
func (this *CreateLoginResponse) Validate() error {
	if this.Login != nil {
		if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(this.Login); err != nil {
			return github_com_mwitkow_go_proto_validators.FieldError("Login", err)
		}
	}
	return nil
}
func (this *AcceptLoginRequest) Validate() error {
	return nil
}
func (this *AcceptLoginResponse) Validate() error {
	return nil
}
func (this *GetConsentRequest) Validate() error {
	return nil
}
func (this *GetConsentResponse) Validate() error {
	return nil
}
func (this *CreateConsentRequest) Validate() error {
	return nil
}
func (this *CreateConsentResponse) Validate() error {
	if this.Consent != nil {
		if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(this.Consent); err != nil {
			return github_com_mwitkow_go_proto_validators.FieldError("Consent", err)
		}
	}
	return nil
}
func (this *AcceptConsentRequest) Validate() error {
	// Validation of proto3 map<> fields is unsupported.
	// Validation of proto3 map<> fields is unsupported.
	return nil
}
func (this *AcceptConsentResponse) Validate() error {
	return nil
}
func (this *CreateLogoutRequest) Validate() error {
	return nil
}
func (this *CreateLogoutResponse) Validate() error {
	if this.Logout != nil {
		if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(this.Logout); err != nil {
			return github_com_mwitkow_go_proto_validators.FieldError("Logout", err)
		}
	}
	return nil
}
func (this *AcceptLogoutRequest) Validate() error {
	return nil
}
func (this *AcceptLogoutResponse) Validate() error {
	return nil
}
func (this *CreateAuthCodeRequest) Validate() error {
	if this.Consent != nil {
		if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(this.Consent); err != nil {
			return github_com_mwitkow_go_proto_validators.FieldError("Consent", err)
		}
	}
	return nil
}
func (this *CreateAuthCodeResponse) Validate() error {
	return nil
}
func (this *VerifyTokenRequest) Validate() error {
	return nil
}
func (this *VerifyTokenResponse) Validate() error {
	return nil
}
func (this *ExchangeRequest) Validate() error {
	return nil
}
func (this *ExchangeResponse) Validate() error {
	return nil
}
func (this *PasswordCredentialsTokenRequest) Validate() error {
	return nil
}
func (this *PasswordCredentialsTokenResponse) Validate() error {
	return nil
}
func (this *RefreshTokenRequest) Validate() error {
	return nil
}
func (this *RefreshTokenResponse) Validate() error {
	return nil
}
func (this *PersonalAccessToken) Validate() error {
	return nil
}
func (this *PatGenerateRequest) Validate() error {
	return nil
}
func (this *PatGenerateResponse) Validate() error {
	return nil
}
func (this *PatListRequest) Validate() error {
	return nil
}
func (this *PatListResponse) Validate() error {
	for _, item := range this.Tokens {
		if item != nil {
			if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(item); err != nil {
				return github_com_mwitkow_go_proto_validators.FieldError("Tokens", err)
			}
		}
	}
	return nil
}
func (this *PatRevokeRequest) Validate() error {
	return nil
}
func (this *PatRevokeResponse) Validate() error {
	return nil
}
